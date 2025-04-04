export async function getElement(selector, root = document) {
  await waitForElement(selector, root)
  return root.querySelector(selector)
}

export function getElementSync(selector, root = document) {
  return root.querySelector(selector)
}

export async function getAllElements(selector, root = document) {
  await waitForElement(selector, root)
  return root.querySelectorAll(selector)
}

export function getAllElementsSync(selector, root = document) {
  return root.querySelectorAll(selector)
}

async function waitForElement(selector, root = document) {
  return new Promise(resolve => {
    if (root.querySelector(selector)) {
      return resolve(root.querySelector(selector))
    }

    const observer = new MutationObserver(() => {
      if (root.querySelector(selector)) {
        observer.disconnect()
        resolve(root.querySelector(selector))
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
  })
}