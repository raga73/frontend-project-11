import onChange from 'on-change'

const render = (path, value, state, form, button, instance) => {
  const body = document.querySelector('body')
  const modalWindow = document.querySelector('#modal')
  const feedBack = document.querySelector('.feedback')
  const input = form.querySelector('input')
  const feeds = document.querySelector('.feeds')
  const posts = document.querySelector('.posts')
  const feedsDiv = document.createElement('div')
  const postsDiv = document.createElement('div')
  const feedsList = document.createElement('ul')
  const backdrop = document.createElement('div')
  backdrop.classList.add('modal-backdrop', 'fade', 'show')
  feedsList.classList.add('list-group', 'border-0', 'rounded-0')
  const postsList = document.createElement('ul')
  postsList.classList.add('list-group', 'border-0', 'rounded-0')

  feedsDiv.classList.add('card', 'border-0')
  feedsDiv.innerHTML = `<div class="card-body">\n
    <h2 class="card-title h4">Фиды</h2></div>`
  postsDiv.classList.add('card', 'border-0')
  postsDiv.innerHTML = `<div class="card-body">\n
    <h2 class="card-title h4">Посты</h2></div>`

  const postsRender = () => {
    posts.textContent = ''
    state.posts.filter(post => post.feedId === state.currentFeedId)
      .map((post) => {
        const currentPostClass = {
          class: 'fw-bold',
        }
        if (state.viewedPostsId.has(post.id)) {
          currentPostClass.class = 'fw-normal link-secondary'
        };
        const li = document.createElement('li')
        li.classList.add('list-group-item',
          'd-flex',
          'justify-content-between',
          'align-items-start',
          'border-0',
          'border-end-0')
        li.innerHTML = `<a href="${post.link}" class="${currentPostClass.class}"
          data-id="${post.id}" target="_blank" rel="noopener noreferrer">${post.title}</a>
          <button type="button" class="btn btn-outline-primary btn-sm" data-id="${post.id}"
          data-bs-toggle="modal" data-bs-target="#modal">Просмотр</button>`
        postsList.append(li)
        postsDiv.append(postsList)
        posts.append(postsDiv)
      })
  }

  switch (path) {
    case 'error':
      feedBack.textContent = instance.t(`errors.${state.error}`)
      feedBack.classList.add('text-danger')
      feedBack.classList.remove('text-success')
      input.classList.add('is-invalid')
      break
    case 'linkStatus':
      switch (value) {
        case 'loading':
          button.classList.add('disabled')
          break
        case 'failed':
          button.classList.remove('disabled')
          break
        case 'successed': {
          feeds.textContent = ''
          input.classList.remove('is-invalid')
          button.classList.remove('disabled')
          state.feeds.map((feed) => {
            const li = document.createElement('li')
            li.classList.add('list-group-item', 'border-0', 'border-end-0')
            li.innerHTML = `<h3 class="h6 m-0">${feed.title}</h3>\n
            <p class="m-0 small text-black-50">${feed.description}\n</p>\n`
            feedsList.prepend(li)
          })
          postsRender()
          feedsDiv.append(feedsList)
          feeds.append(feedsDiv)
          input.focus()
          form.reset()
          feedBack.textContent = instance.t(`successed.successedLink`)
          feedBack.classList.remove('text-danger')
          feedBack.classList.add('text-success')
          break
        }
        case 'update': {
          postsRender()
          break
        }
      }
      break
    case 'modalWindowStatus':
      switch (value) {
        case 'open': {
          modalWindow.classList.add('show')
          modalWindow.setAttribute('style', 'display: block')
          modalWindow.setAttribute('aria-modal', 'true')
          modalWindow.removeAttribute('aria-hidden')
          const [clickedPost] = state.posts
            .filter(post => post.id === state.clickedPostId)
          modalWindow.querySelector('.modal-body').textContent = clickedPost.description
          modalWindow.querySelector('h5').textContent = clickedPost.title
          modalWindow.querySelector('.full-article').setAttribute('href', `${clickedPost.link}`)
          body.append(backdrop)
          postsRender()
        }
          break
        case 'close': {
          modalWindow.classList.remove('show')
          modalWindow.setAttribute('style', 'display: none')
          document.querySelector('.modal-backdrop').remove()
        }
      }
  };
}

export default (state, form, button, instance) => {
  return onChange(state, (path, value) => {
    render(path, value, state, form, button, instance)
  })
}
