import { db, storage } from "./firebase";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function AddProduct() {
  const [produtoNome, SetProdutoNome] = useState("");
  const [produtoDesc, SetProdutoDesc] = useState("");
  const [produtoPreco, SetProdutoPreco] = useState("");
  const [imageUpload, setImageUpload] = useState(null);

  async function sub(e) {
    e.preventDefault();

    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("fodase");
    });

    await addDoc(collection(db, "produtos"), {
      produtoNome,
      produtoDesc,
      produtoPreco,
      produtoImg: `images/${imageUpload.name + v4()}`,
    });
  }

  return (
    <div>
      <center>
        <form
          style={{ marginTop: "200px" }}
          onSubmit={(event) => {
            sub(event);
          }}
        >
          <input
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
          <br />
          <input
            type="text"
            placeholder="Nome do produto"
            onChange={(e) => {
              SetProdutoNome(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="Descrição do produto"
            onChange={(e) => {
              SetProdutoDesc(e.target.value);
            }}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="Preço do produto"
            onChange={(e) => {
              SetProdutoPreco(Number(e.target.value));
            }}
          />
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </center>
    </div>
  );
}

export default AddProduct;
