import { NextFunction, Request, Response, Router } from 'express';
import { getEquipementRepository, Equipement } from './model';

export const router: Router = Router();

//Les diffrentes actions GET, POST, DELETE, UPDATE sur l'objet equipement

router.get('/equipement', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getEquipementRepository();
    const allEquipements = await repository.find();
    res.send(allEquipements);
  }
  catch (err) {
    return next(err);
  }
});

router.get('/equipement/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getEquipementRepository();
    const equipement = await repository.findOne(req.params.id);
    res.send(equipement);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/equipement', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getEquipementRepository();
    const equipement = new Equipement();
    equipement.designation = req.body.designation;
    equipement.image = req.body.image;
    equipement.description = req.body.description;
    equipement.prix = Number.parseFloat(req.body.prix);
    equipement.quantite = Number.parseInt(req.body.quantite);

    const result = await repository.save(equipement);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.post('/equipement/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getEquipementRepository();
    const equipement = await repository.findOne(req.params.id);
    equipement.designation = req.body.designation;
    equipement.image = req.body.image;
    equipement.description = req.body.description;
    equipement.prix = Number.parseFloat(req.body.prix);
    equipement.quantite = Number.parseInt(req.body.quantite);

    const result = await repository.save(equipement);
    res.send(result);
  }
  catch (err) {
    return next(err);
  }
});

router.delete('/equipement/:id', async function (req: Request, res: Response, next: NextFunction) {
  try {
    const repository = await getEquipementRepository();
    await repository.delete(req.params.id);
    res.send('OK');
  }
  catch (err) {
    return next(err);
  }
});