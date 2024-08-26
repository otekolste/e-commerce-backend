const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({
      include: [{ model: Category },{ model: Tag }], // Include all associated tags and associated category
    });
    res.status(200).json(productData); // Return info as response
  }
  catch(e) {
    res.status(500).json(e); // Throw error if necessary
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findByPk(req.params.id, { // Find corresponding product by ID passed in request
      include: [{ model: Category } , { model: Tag }],  // Include all associated tags and associated category
    });
    if (!productData) {
      res.status(404).json({ message: 'No category found with that id!' }); // If it doesn't exist, throw error message and return
      return;
    }
    res.status(200).json(productData); // Return info as response
  } catch (e) {
    res.status(500).json(e); // Throw error if necessary
  }
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
 // The following code was provided by edX:
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

            // figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
                  // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});
// -- End code provided by edX

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const productToDelete = await Product.findByPk(req.params.id); // Find corresponding product by ID passed in request
    if (!productToDelete) {
      res.status(404).json({ message: 'No category found with that id!' }); // If it doesn't exist, throw error message and return
      return;
    }
    await productToDelete.destroy(); // Delete product
    res.status(200).json('Successfully deleted!'); // Return message on success
  }
  catch(e){
    res.status(400).json(e); // Throw error if necessary
  }
});

module.exports = router;
