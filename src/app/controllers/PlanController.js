import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();
    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .required()
        .positive(),
      price: Yup.number()
        .required()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const planExists = await Plan.findOne({
      where: { title: req.body.title },
    });
    if (planExists) {
      return res.status(400).json({ error: 'Plan already exists' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number().positive(),
      price: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }
    const plans = await Plan.findByPk(req.params.id);
    const { id, title, duration, price } = await plans.update(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async destroy(req, res) {
    const plans = await Plan.findByPk(req.params.id);
    const planDeleted = await plans.destroy(req.body);
    if (!planDeleted) {
      return res.json({ msg: 'Plan not deleted' });
    }
    return res.status(200).json({
      msg: 'Plan deleted',
    });
  }
}

export default new PlanController();
