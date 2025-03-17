import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { db, collection, addDoc, getDocs, deleteDoc, doc } from "../../firebaseConfig";

// Definir tipo para usuarios
interface Usuario {
  id: string;
  nombre: string;
}

export default function App() {
  const [nombre, setNombre] = useState<string>("");
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // 🔄 Cargar usuarios desde Firestore
  const fetchUsuarios = async () => {
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    const listaUsuarios = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Usuario[];
    setUsuarios(listaUsuarios);
  };

  // ➕ Agregar usuario
  const agregarUsuario = async () => {
    if (nombre.trim() === "") return;
    await addDoc(collection(db, "usuarios"), { nombre });
    setNombre("");
    fetchUsuarios(); // Recargar lista
  };

  // ❌ Eliminar usuario
  const eliminarUsuario = async (id: string) => {
    await deleteDoc(doc(db, "usuarios", id));
    fetchUsuarios(); // Recargar lista
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>CRUD con Firebase (TypeScript)</Text>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Agregar" onPress={agregarUsuario} />

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 5 }}>
            <Text>{item.nombre}</Text>
            <Button title="❌" onPress={() => eliminarUsuario(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
