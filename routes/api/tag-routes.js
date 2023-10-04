const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll
      ({ include: [{ model: Product }] });
    return res.status(200).json(allTags);
  } catch (error) {
    console.error(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const { id } = req.params;
    const foundTag = await Tag.findByPk
      (id, { include: [{ model: Product }] });
    return res.status(200).json(foundTag);
  } catch (error) {
    console.error(error);
  };
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const { tag_name } = req.body;
    const newTag = await Tag.create
      ({ tag_name: tag_name });
    return res.status(200).json(newTag);
  }
  catch (error) {
    console.error(error);
  };
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const { id } = req.params;
    const updatedTag = await Tag.update
      (req.body, { where: { id: id } });
    return res.status(200).json(updatedTag);
  }
  catch (error) {
    console.error(error);
  };
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const { id } = req.params;
    const deletedTag = await Tag.destroy
      ({ where: { id: id } });
    return res.status(200).json(deletedTag);
  }
  catch (error) {
    console.error(error);
  };
});

module.exports = router;
