const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll
      ({ include: [{ model: Product }] });
    return res.status(200).json(allCategories);
  } catch (error) {
    console.error(error);
  };
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const { id } = req.params;
    const foundCategory = await Category.findByPk
      (id, { include: [{ model: Product }] });
    return res.status(200).json(foundCategory);
  } catch (error) {
    console.error(error);
  };
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const { category_name, products } = req.body;
    const newCategory = await Category.create
      ({ category_name: category_name, products: products })
    return res.status(200).json(newCategory);
  } catch (error) {
    console.error(error);
  };
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const { id } = req.params;
    const { category_name } = req.body;
    const updatedCategory = await Category.update
      ({ category_name: category_name }, { where: { id: id } });
    return res.status(200).json(updatedCategory);
  }
  catch (error) {
    console.error(error);
  };
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const { id } = req.params;
    const deletedCategory = await Category.destroy
      ({ where: { id: id } });
    return res.status(200).json(deletedCategory);
  }
  catch (error) {
    console.error(error);
  };
});

module.exports = router;