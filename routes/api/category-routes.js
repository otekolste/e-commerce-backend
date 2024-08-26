const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }], // Include all associated products
    });
    res.status(200).json(categoryData); // Return info as response
  }
  catch(e) {
    res.status(500).json(e); // Throw error if necessary
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, { // Find corresponding category by ID passed in request
      include: [{ model: Product }], // Include all associated products
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' }); // If none exist with that ID, throw a message and return
      return;
    }
    res.status(200).json(categoryData); // Return info as response
  } catch (e) {
    res.status(500).json(e); // Throw error if necessary
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body); // Create new category using info from the request body
    res.status(200).json(categoryData); // Return corresponding info
  } catch (e) {
    res.status(400).json(e); // Throw error if necessary
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    const categoryToChange = await Category.findByPk(req.params.id); // Find corresponding category by ID passed in request
    if (!categoryToChange) {
      res.status(404).json({ message: 'No category found with that id!' }); // If it doesn't exist, throw error message and return
      return;
    }
    await categoryToChange.update(req.body); // Update category with info from request body
    await categoryToChange.save(); // Save updated category
    res.status(200).json(categoryToChange); 
  }
  catch(e) {
    res.status(400).json(e); // Throw error if necessary
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryToDelete = await Category.findByPk(req.params.id); // Find corresponding category by ID passed in request
    if (!categoryToDelete) {
      res.status(404).json({ message: 'No category found with that id!' }); // If it doesn't exist, throw error message and return
      return;
    }
    await categoryToDelete.destroy();
    res.status(200).json('Successfully deleted!'); // Return message on success
  }
  catch(e){
    res.status(400).json(e); // Throw error if necessary
  }
});

module.exports = router;
