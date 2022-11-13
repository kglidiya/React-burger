import PropTypes from 'prop-types';

export const ingredientType = PropTypes.shape({
    'calories': PropTypes.number.isRequired,
    'carbohydrates': PropTypes.number.isRequired,
    'fat': PropTypes.number.isRequired,
    'image': PropTypes.string.isRequired,
    'image_large': PropTypes.string.isRequired,
    'image_mobile': PropTypes.string.isRequired,
    'name': PropTypes.string.isRequired,
    'price': PropTypes.number.isRequired,
    'proteins': PropTypes.number.isRequired,
    'type': PropTypes.string.isRequired,
    '__v': PropTypes.number.isRequired,
    '_id': PropTypes.string.isRequired,
})

export const navLinkPropTypes = PropTypes.shape({
    value: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    iconPrimary: PropTypes.elementType.isRequired,
    iconSecondary: PropTypes.elementType.isRequired,
    onClick: PropTypes.func.isRequired
});

export const stylePropTypes = PropTypes.shape({
    boxShadow: PropTypes.string
});

export const orderPropTypes = PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
});



