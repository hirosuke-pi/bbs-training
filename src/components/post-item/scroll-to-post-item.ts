export function scrollToPostItem(
  postElement: HTMLElement,
  targetIndex: string
) {
  postElement.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
  postElement.classList.add("ring", "ring-2", "ring-sky-400");
  setTimeout(() => {
    postElement.classList.remove("ring", "ring-2", "ring-sky-400");
  }, 2000);
  history.replaceState(null, "", `#post-${targetIndex}`);
}
