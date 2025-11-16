import { auth, db } from "./firebaseConnection";
import "./App.css";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [idPost, setIdPost] = useState("");
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [user, setUser] = useState(false);
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    async function loadPosts() {
      const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });

        setPosts(lista);
      });
    }

    loadPosts();
  }, []);

  useEffect(() => {
    async function checkLogin() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Caso exista um usuário logado
          console.log(user);
          setUser(true);
          setUserDetail({
            uid: user.uid,
            email: user.email,
          });
        } else {
          setUser(false);
          setUserDetail({});
        }
      });
    }

    checkLogin();
  }, []);

  async function handleAdd() {
    // await setDoc(doc(db, "posts", "12345"), {
    //   titulo: titulo,
    //   autor: autor,
    // })
    //   .then(() => {
    //     console.log("Dados registrados no banco!");
    //   })
    //   .catch((error) => {
    //     console.log("Erro: " + error);
    //   });
    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("Dados registrados no banco!");
        setAutor("");
        setTitulo("");
      })
      .catch((error) => {
        console.log("Erro: " + error);
      });
  }

  async function buscarPost() {
    // const postRef = doc(db, "posts", "12345");

    // await getDoc(postRef)
    //   .then((snapshot) => {
    //     setAutor(snapshot.data().autor);
    //     setTitulo(snapshot.data().titulo);
    //   })
    //   .catch(() => {
    //     console.log("Erro!");
    //   });

    const postRef = collection(db, "posts");
    await getDocs(postRef)
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });

        setPosts(lista);
      })
      .catch((erro) => {
        console.log(erro.menssage);
      });
  }

  async function editarPost() {
    const docRef = doc(db, "posts", idPost);

    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("Post atualizado!");
        setIdPost("");
        setTitulo("");
        setAutor("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function excluirPost(id) {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef).then(() => {
      alert("Post deletado!");
      buscarPost();
    });
  }

  async function novoUsuario() {
    await createUserWithEmailAndPassword(auth, email, senha)
      .then((value) => {
        alert("Usuário cadastrado com sucesso!");
        console.log(value);
        setEmail("");
        setSenha("");
      })
      .catch((error) => {
        // alert(error);
        // console.log("Ocorreu um erro: " + error);
        if (error.code === "auth/weak-password") {
          alert("Senha muito fraca!");
        } else if (error.code === "auth/email-already-in-use") {
          alert("Email já existe!");
        }
      });
  }

  async function logarUsuario() {
    await signInWithEmailAndPassword(auth, email, senha)
      .then((value) => {
        alert("Login realizado com sucesso!");
        console.log(value.user);

        setUserDetail({
          uid: value.user.uid,
          email: value.user.email,
        });

        setUser(true);

        setEmail("");
        setSenha("");
      })
      .catch((error) => {
        console.log("Erro ao logar: " + error);
      });
  }

  async function fazerLogout() {
    await signOut(auth);
    setUser(false);
    setUserDetail({});
  }

  return (
    <div>
      <h1>ReactJs + Firebase</h1>

      {user && (
        <div>
          <strong>Seja bem-vindo. Você está logado!</strong> <br />
          <span>
            ID: {userDetail.uid} - Email: {userDetail.email}
          </span>
          <br /> <br />
          <button onClick={fazerLogout}>Logout</button>
        </div>
      )}

      <h2>Usuários:</h2>

      <div className="container">
        <label htmlFor="">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />{" "}
        <br />
        <label>Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite sua senha"
        />
        <br />
        <button onClick={novoUsuario}>Cadastrar</button>
        <button onClick={logarUsuario}>Fazer login</button>
        <br />
      </div>

      <hr />

      <h2>Posts:</h2>

      <div className="container">
        <label>ID do Post: </label>
        <input
          placeholder="Digite o ID do post"
          value={idPost}
          onChange={(e) => setIdPost(e.target.value)}
        />
        <label>Titulo:</label>
        <textarea
          placeholder="Digite o titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        ></textarea>
        <label>Autor:</label>
        <input
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          type="text"
          placeholder="Autor do post"
        />
        <br />
        <button onClick={handleAdd}>Cadastrar</button> <br />
        <button onClick={buscarPost}>Buscar</button> <br />
        <button onClick={editarPost}>Atualizar post</button>
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <strong>ID: {post.id}</strong> <br />
                <span>Titulo: {post.titulo}</span> <br />
                <span>Autor: {post.autor}</span> <br />
                <button onClick={() => excluirPost(post.id)}>Excluit</button>
                <br /> <br />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
