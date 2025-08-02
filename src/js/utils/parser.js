export default (response) => {
  const parser = new DOMParser()
  const xmlString = response.data.contents
  const doc = parser.parseFromString(xmlString, 'text/xml')
  const errorNode = doc.querySelector('parsererror')
  if (errorNode) {
    return 'notARSS'
  } else {
    return {
      feed:
          {
            title: doc.querySelector('title').textContent,
            description: doc.querySelector('description').textContent,
          },
      posts: Array.from(doc.querySelectorAll('item')).map((item) => {
        return {
          title: item.querySelector('title').textContent,
          link: item.querySelector('link').textContent,
          description: item.querySelector('description').textContent,
        }
      }),
    }
  }
}
