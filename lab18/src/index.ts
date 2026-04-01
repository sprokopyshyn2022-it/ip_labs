const API_URL = "https://69b11abdadac80b427c3fff2.mockapi.io/api/v1/todoItem";

// Впишіть номер за журналом
const USER_ID = 14;

document.addEventListener("DOMContentLoaded", () => {
  const mainHeader = document.getElementById("mainHeader");
  if (mainHeader) mainHeader.textContent += ` - Студент #${USER_ID}`;

  const form = document.getElementById("todoForm") as HTMLFormElement;
  const list = document.getElementById("todoList") as HTMLElement;
  const template = document.getElementById("task-template") as HTMLTemplateElement;
  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
  const loadingIndicator = document.getElementById("loadingIndicator") as HTMLElement;

  let isEditing = false;
  let currentEditId: string | null = null;

  async function fetchTodos() {
    loadingIndicator.style.display = "block";
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Помилка завантаження");
      const data = await response.json();

      list.innerHTML = "";
      data.forEach((task: any) => addTaskToDOM(task, true));
    } catch (error) {
      console.error(error);
      alert("Не вдалося завантажити завдання з сервера.");
    } finally {
      loadingIndicator.style.display = "none";
    }
  }

  function formatDate(timestamp: string | number | undefined) {
    if (!timestamp) return "Невідомо";
    const date = new Date(Number(timestamp) * 1000);
    return isNaN(date.getTime()) ? String(timestamp) : date.toLocaleDateString("uk-UA");
  }

  function addTaskToDOM(task: any, append = false) {
    const fragment = template.content.cloneNode(true) as DocumentFragment;
    const el = fragment.querySelector(".task-card") as HTMLElement;

    el.dataset.id = task.id;

    if (task.isDone) el.classList.add("task-card--done");

    (el.querySelector(".task-card__id") as HTMLElement).textContent = task.id;
    (el.querySelector(".task-card__userid") as HTMLElement).textContent = task.userId;
    (el.querySelector(".task-card__title") as HTMLElement).textContent = task.title;
    (el.querySelector(".task-card__tag") as HTMLElement).textContent = task.tag;
    (el.querySelector(".task-card__desc") as HTMLElement).textContent = task.description;
    (el.querySelector(".task-card__deadline") as HTMLElement).textContent = task.deadline || "Без дати";
    (el.querySelector(".task-card__created") as HTMLElement).textContent = formatDate(task.createdAt);

    if (task.isDone) {
      (el.querySelector(".task-card__status") as HTMLElement).textContent = `✅ Виконано`;
      ((el.querySelector(".btn--complete") as HTMLElement).style).opacity = "0.5";
    }

    if (append) list.appendChild(el);
    else list.prepend(el);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const taskData = {
      userId: USER_ID,
      title: formData.get("title"),
      description: formData.get("description"),
      tag: formData.get("tag"),
      deadline: formData.get("deadline"),
      createdAt: isEditing ? undefined : Math.floor(Date.now() / 1000),
      isDone: false,
    };

    submitBtn.disabled = true;

    if (isEditing && currentEditId) {
      try {
        const response = await fetch(`${API_URL}/${currentEditId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        });

        if (!response.ok) throw new Error("Помилка при оновленні");

        await fetchTodos();
        resetFormState();
      } catch (error) {
        console.error("Помилка редагування:", error);
        alert("Не вдалося зберегти зміни.");
      }
    } else {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskData),
        });

        if (!response.ok) throw new Error("Помилка сервера");

        const createdTask = await response.json();
        addTaskToDOM(createdTask);
        form.reset();
      } catch (error) {
        console.error("Помилка створення:", error);
        alert("Не вдалося створити запис.");
      }
    }
    submitBtn.disabled = false;
  });

  form.addEventListener("reset", () => resetFormState());

  function resetFormState() {
    isEditing = false;
    currentEditId = null;
    form.reset();
    submitBtn.innerHTML = `<svg class="btn__icon"><use href="img/sprite.svg#icon-save"></use></svg> <span class="btn__text">Додати задачу</span>`;
    submitBtn.classList.remove("btn--edit");
    submitBtn.classList.add("btn--primary");
  }

  list.addEventListener("click", async (event) => {
    const target = event.target as HTMLElement;
    const btn = target.closest(".btn") as HTMLElement | null;
    if (!btn) return;

    const card = btn.closest(".task-card") as HTMLElement;
    const taskId = card.dataset.id as string;

    // delete
    if (btn.classList.contains("btn--delete")) {
      if (confirm("Видалити цю задачу з сервера?")) {
        try {
          const response = await fetch(`${API_URL}/${taskId}`, {
            method: "DELETE"
          });

          if (!response.ok) throw new Error("Помилка видалення");
          card.remove();
        } catch (error) {
          console.error("Помилка при видаленні:", error);
          alert("Не вдалося видалити завдання.");
        }
      }
    }

    // complete
    if (btn.classList.contains("btn--complete")) {
      const isCurrentlyDone = card.classList.contains("task-card--done");

      try {
        await fetch(`${API_URL}/${taskId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isDone: !isCurrentlyDone }),
        });

        card.classList.toggle("task-card--done");
        const status = card.querySelector(".task-card__status") as HTMLElement;
        if (!isCurrentlyDone) {
          status.textContent = `✅ Виконано`;
          btn.style.opacity = "0.5";
        } else {
          status.textContent = `Статус: В роботі`;
          btn.style.opacity = "1";
        }
      } catch (error) {
        console.error("Помилка зміни статусу:", error);
      }
    }

    // edit
    if (btn.classList.contains("btn--edit-action")) {
      isEditing = true;
      currentEditId = taskId;

      (form.elements.namedItem("title") as HTMLInputElement).value =
        (card.querySelector(".task-card__title") as HTMLElement).textContent || "";
      (form.elements.namedItem("description") as HTMLInputElement).value =
        (card.querySelector(".task-card__desc") as HTMLElement).textContent || "";
      (form.elements.namedItem("tag") as HTMLInputElement).value =
        (card.querySelector(".task-card__tag") as HTMLElement).textContent || "";

      const deadline = (card.querySelector(".task-card__deadline") as HTMLElement).textContent;
      (form.elements.namedItem("deadline") as HTMLInputElement).value = deadline === "Без дати" ? "" : deadline || "";

      submitBtn.innerHTML = `<svg class="btn__icon"><use href="img/sprite.svg#icon-edit"></use></svg> <span class="btn__text">Зберегти зміни</span>`;
      submitBtn.classList.remove("btn--primary");
      submitBtn.classList.add("btn--edit");
      form.scrollIntoView({ behavior: "smooth" });
    }
  });

  fetchTodos();
});