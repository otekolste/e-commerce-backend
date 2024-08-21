const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  }
  catch(e) {
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (e) {
    res.status(500).json(e);
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    const categoryToChange = await Category.findByPk(req.params.id);
    if (!categoryToChange) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    await categoryToChange.update(req.body);
    await categoryToChange.save();
    res.status(200).json(categoryToChange);
  }
  catch(e) {
    res.status(400).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryToDelete = await Category.findByPk(req.params.id);
    if (!categoryToDelete) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    await categoryToDelete.destroy();
    res.status(200).json('Successfully deleted!');
  }
  catch(e){
    res.status(400).json(e);
  }
});

module.exports = router;
