import { format, parseISO, isBefore, addMonths } from 'date-fns';
import { pt } from 'date-fns/locale/pt';
import * as Yup from 'yup';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';
import Mail from '../../lib/Mail';

class EnrollmentController {
  async index(req, res) {
    const Enrollments = await Enrollment.findAll({
      attributes: ['start_date', 'end_date', 'price', 'plan_id'],
      include: {
        model: Student,
        as: 'student',
        attributes: ['name', 'email', 'age', 'weight', 'height'],
      },
    });
    return res.json(Enrollments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }
    const { plan_id, start_date } = req.body;
    const { student_id } = req.params;

    const studentExists = await Student.findByPk(student_id);
    const planExists = await Plan.findByPk(plan_id);

    /**
     * check if the student is enrollmented
     */
    if (!studentExists) {
      return res.status(400).json({
        error: 'Students is not enrollment',
      });
    }

    /**
     * check is the plan exists
     */
    if (!planExists) {
      return res.status(400).json({
        error: 'Plan not exists',
      });
    }
    /**
     * Check for past dates
     */
    const date = parseISO(start_date);
    if (isBefore(date, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    /**
     * add time full of plan
     */
    const plan = await Plan.findOne({ where: { id: plan_id } });
    const durationPlan = plan.duration;
    const addmonth = addMonths(date, durationPlan);
    /**
     * add price full of plan
     */
    const pricePlan = plan.price * durationPlan;

    /**
     * check if alredy exists a plan for student;
     */
    const alreadyPlan = await Enrollment.findOne({
      where: {
        student_id,
        plan_id,
      },
    });

    if (alreadyPlan) {
      return res
        .status(400)
        .json({ error: 'student alredy have a plan active' });
    }

    const enrollments = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date: addmonth,
      price: pricePlan,
    });

    const enrol = await Enrollment.findOne({ where: { student_id } });
    // const endDay = parseISO();

    await Mail.sendMail({
      to: `${studentExists.name} <${studentExists.email}>`,
      subject: 'Student Enrollment',
      template: 'enrollment',
      context: {
        student: studentExists.name,
        plan: planExists.title,
        date_end: format(enrol.end_date, "'dia' dd 'de' MMMM", {
          locale: pt,
        }),
        price_full: enrol.price,
      },
    });
    return res.json(enrollments);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }
    const { plan_id, start_date } = req.body;
    const { student_id } = req.params;

    const studentExists = await Student.findByPk(student_id);
    const planExists = await Plan.findByPk(plan_id);

    /**
     * check if the student is enrollmented
     */
    if (!studentExists) {
      return res.status(400).json({
        error: 'Students is not enrollment',
      });
    }
    /**
     * check is the plan exists
     */
    if (!planExists) {
      return res.status(400).json({
        error: 'Plan not available',
      });
    }

    /**
     * Check for past dates
     */
    const date = parseISO(start_date);
    if (isBefore(date, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    /**
     * add time full of plan
     */
    const plan = await Plan.findOne({ where: { id: plan_id } });
    const durationPlan = plan.duration;
    const addmonth = addMonths(date, durationPlan);
    /**
     * add price full of plan
     */
    const pricePlan = plan.price * durationPlan;

    const enrol = await Enrollment.findOne({ where: { student_id } });

    const enrollments = await enrol.update({
      plan_id,
      start_date,
      end_date: addmonth,
      price: pricePlan,
    });

    return res.json(enrollments);
  }

  async destroy(req, res) {
    const { student_id } = req.params;
    const enrollment = await Enrollment.findOne({ where: { student_id } });

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    const planDeleted = await enrollment.destroy();
    if (!planDeleted) {
      return res.json({ msg: 'Plan not deleted' });
    }
    return res.status(200).json({
      msg: 'Plan deleted',
    });
  }
}

export default new EnrollmentController();

/**
 * check planexpireds
 */
// const enrollment = await Enrollment.findOne({ where: id });
// const enrollmentActive = enrollment.end_date;
// const enrollmentExpireds = isBefore(enrollmentActive, new Date());
