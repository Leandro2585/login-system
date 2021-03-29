const fieldsValidator = (body, [...fields]) => {
  for (const field of fields) {
    if (!body[field]) {
      return {
        status: false,
        missingField: field
      }
    }
  }
  return { status: true }
}

module.exports = fieldsValidator
