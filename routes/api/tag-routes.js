const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }], // Include all associated products
    });
    res.status(200).json(tagData); // Return info as response
  }
  catch(e) {
    res.status(500).json(e); // Throw error if necessary
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, { // Find corresponding tag by ID passed in request
      include: [{ model: Product }], // Include all associated products
    });

    if (!tagData) {
      res.status(404).json({ message: 'No category found with that id!' }); // If it doesn't exist, throw error message and return
      return;
    }
    res.status(200).json(tagData);  // Return info as response
  } catch (e) {
    res.status(500).json(e); // Throw error if necessary
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body); // Create new tag using request body 
    res.status(200).json(tagData); // Return info as response
  } catch (e) {
    res.status(400).json(e); // Throw error if necessary
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagToChange = await Tag.findByPk(req.params.id); // Find corresponding tag by ID passed in request
    if (!tagToChange) {
      res.status(404).json({ message: 'No tag found with that id!' }); // If it doesn't exist, throw error message and return
      return;
    }
    await tagToChange.update(req.body); // Update tag using the request body
    await tagToChange.save(); // Save updated tag
    res.status(200).json(tagToChange); // Return info as response
  }
  catch(e) {
    res.status(400).json(e); // Throw error if necessary
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagToDelete = await Tag.findByPk(req.params.id); // Find corresponding tag by ID passed in request
    if (!tagToDelete) {
      res.status(404).json({ message: 'No tag found with that id!' }); // If it doesn't exist, throw error message and return
      return;
    }
    await tagToDelete.destroy(); // Destroy tag
    res.status(200).json('Successfully deleted!'); // Return message on success
  }
  catch(e){
    res.status(400).json(e); // Throw error if necessary
  }
});

module.exports = router;
