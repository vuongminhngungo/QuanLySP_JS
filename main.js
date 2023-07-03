let productList = JSON.parse(localStorage.getItem("productList")) || [];
const formProduct = document.querySelector(".form");
const idInput = formProduct.querySelector(".insert-form #idProduct");
const nameInput = formProduct.querySelector(".insert-form #nameProduct");
const priceInput = formProduct.querySelector(".insert-form  #priceProduct");
const bodyProduct = formProduct.querySelector(".data-list tbody");
formProduct.addEventListener("submit", (e) => {
  e.preventDefault();

  const item = {
    idItem: idInput.value,
    nameItem: nameInput.value,
    priceItem: priceInput.value,
  };
  if (
    idInput.value === "" ||
    nameInput.value === "" ||
    priceInput.value === ""
  ) {
    alert("Vui lòng không để trống");
    return;
  } else {
    isEmpty(productList, item);
    idInput.value = "";
    nameInput.value = "";
    priceInput.value = "";
  }
  renderList(productList);
  saveData(productList);
});

showData();
saveData(productList);
deleteProduct(productList);
editProduct(productList);

function isEmpty(productList, item) {
  let empty = true;
  for (const i of productList) {
    if (i.idItem === item.idItem) {
      alert("Mã sản phẩm đã tồn tại");
      empty = false;
      break;
    }
  }
  if (empty === true) {
    alert("Thêm sản phẩm thành công");
    productList.push(item);
  }
}
function renderList(productList) {
  const content = productList
    .map((item, index) => {
      return `<tr>
      <td class="product-code">${item.idItem}</td>
      <td class="product-name">
        <p>${item.nameItem}</p>
        <input class="hidden"
          type="text"
          name="name"
          value="${item.nameItem}"
        />
      </td>
      <td class="product-price">
      <p>${item.priceItem} đ</p>
      <input class="hidden" type="text" name="price" value="10000" />
      </td>
      <td>
        <a class="action-button edit-button" href="#"  id=${index}>Edit</a>
        <a class="action-button delete-button" href="#" id=${index}>Delete</a>
        <button class="save-button hidden">Lưu</button>
        <button class="cancel-button hidden">Quay Lại</button>
      </td>
    </tr> `;
    })
    .join("");
  bodyProduct.innerHTML = content;
}
function saveData(productList) {
  localStorage.setItem("productList", JSON.stringify(productList));
}
function showData() {
  const productShow = JSON.parse(localStorage.getItem("productList")) || [];
  renderList(productShow);
}
function deleteProduct(productList) {
  bodyProduct.addEventListener("click", (e) => {
    e.preventDefault();
    const deleteBtn = e.target.closest(".delete-button");
    const tempId = parseInt(e.target.id);
    if (deleteBtn) {
      if (
        confirm(`Bạn có muốn xóa sản phẩm id: ${productList[tempId].idItem}`)
      ) {
        productList.splice(tempId, 1);
        renderList(productList);
        saveData(productList);
      } else {
        return;
      }
    }
  });
}
function editProduct(productList) {
  bodyProduct.addEventListener("click", (e) => {
    e.preventDefault();
    const btnEdit = e.target.closest(".edit-button");
    if (btnEdit) {
      const itemEdit = e.target.closest("tr");
      const descNameEdit = itemEdit.querySelector(".product-name p");
      const inputNameEdit = itemEdit.querySelector(".product-name input");
      const descPriceEdit = itemEdit.querySelector(".product-price p");
      const inputPriceEdit = itemEdit.querySelector(".product-price input");
      const saveEdit = itemEdit.querySelector(".save-button");
      const cancelEdit = itemEdit.querySelector(".cancel-button");
      const btnBefore = itemEdit.querySelectorAll(".action-button");

      descNameEdit.classList.add("hidden");
      inputNameEdit.classList.remove("hidden");
      // price-edit
      descPriceEdit.classList.add("hidden");
      inputPriceEdit.classList.remove("hidden");
      inputPriceEdit.value = descPriceEdit.textContent;
      // save and cancel-edit
      saveEdit.classList.remove("hidden");
      cancelEdit.classList.remove("hidden");
      // hidden Before-edit
      btnBefore.forEach((element) => {
        element.classList.add("hidden");
      });

      saveEdit.addEventListener("click", (e) => {
        e.preventDefault();
        const idEdit = parseInt(btnEdit.id);
        if (inputNameEdit.value === "" || inputPriceEdit.value === "") {
          alert("Vui lòng không để trống");
          return;
        } else {
          alert("Lưu thành công");
          // name
          inputNameEdit.classList.add("hidden");
          descNameEdit.classList.remove("hidden");
          descNameEdit.textContent = inputNameEdit.value;
          // price
          inputPriceEdit.classList.add("hidden");
          descPriceEdit.classList.remove("hidden");
          descPriceEdit.textContent = inputPriceEdit.value;
          // save and cancel
          saveEdit.classList.add("hidden");
          cancelEdit.classList.add("hidden");
          // hidden Before
          btnBefore.forEach((element) => {
            element.classList.remove("hidden");
          });
        }
        productList[idEdit].nameItem = inputNameEdit.value;
        productList[idEdit].priceItem = inputPriceEdit.value;
        saveData(productList);
      });

      cancelEdit.addEventListener("click", (e) => {
        e.preventDefault();
        // name
        inputNameEdit.classList.toggle("hidden");
        descNameEdit.classList.toggle("hidden");
        descNameEdit.textContent = inputNameEdit.value;

        // price
        inputPriceEdit.classList.toggle("hidden");
        descPriceEdit.classList.toggle("hidden");
        descPriceEdit.textContent = inputPriceEdit.value;

        // save and cancel
        saveEdit.classList.toggle("hidden");
        cancelEdit.classList.toggle("hidden");

        // hidden Before
        btnBefore.forEach((element) => {
          element.classList.toggle("hidden");
        });
      });
    }
  });
}
