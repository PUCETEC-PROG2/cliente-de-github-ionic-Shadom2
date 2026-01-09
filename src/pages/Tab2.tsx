import React, { useState } from 'react';
import { 
  IonButton, 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTextarea, 
  IonTitle, 
  IonToolbar, 
  IonInput, 
  useIonToast, // Para mensajes emergentes
  useIonLoading // Para el spinner de carga
} from '@ionic/react';
import './Tab2.css';
import { useHistory } from 'react-router-dom';
import { createRepository } from '../services/GithubService';

const Tab2: React.FC = () => {
  const history = useHistory();
  
  // 1. Usamos useState para manejar los datos del formulario
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Hooks para feedback visual (Requisito del examen)
  const [presentToast] = useIonToast();
  const [present, dismiss] = useIonLoading();

  const saveRepo = async () => {
    // 2. Validación del formulario
    if (!name.trim()) {
      presentToast({
        message: 'El nombre del repositorio es obligatorio',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      return;
    }

    // 3. Feedback visual: Mostrar "Cargando..."
    await present({
      message: 'Creando repositorio...',
    });

    try {
      // Llamada al servicio
      await createRepository(name, description);

      // Ocultar cargando
      await dismiss();

      // Mensaje de éxito
      presentToast({
        message: '¡Repositorio creado con éxito!',
        duration: 2000,
        color: 'success', 
        position: 'bottom'
      });

      // Limpiar formulario
      setName('');
      setDescription('');

      // 4. Redirección y Actualización
      // Al ir a Tab1, el useIonViewDidEnter de Tab1 se encargará de recargar la lista
      history.push('/tab1');

    } catch (error) {
      await dismiss(); // Ocultar cargando si falla
      console.error('Error creating repository:', error);
      
      // Mensaje de error
      presentToast({
        message: 'Error al crear el repositorio. Revisa la consola.',
        duration: 3000,
        color: 'danger',
        position: 'bottom'
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nuevo Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Nuevo Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container" style={{ padding: '20px' }}>
          {/* Input Nombre */}
          <IonInput
            className="form-field"
            label="Nombre del repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="ej. mi-proyecto-ionic"
            value={name}
            onIonInput={(e) => setName(e.detail.value!)} // Usamos onIonInput y actualizamos el estado
            style={{ marginBottom: '20px' }}
          ></IonInput>

          {/* Input Descripción */}
          <IonTextarea
            className="form-field"
            label="Descripción (Opcional)"
            labelPlacement="floating"
            fill="outline"
            placeholder="¿De qué trata este proyecto?"
            rows={4}
            autoGrow
            value={description}
            onIonInput={(e) => setDescription(e.detail.value!)}
            style={{ marginBottom: '20px' }}
          ></IonTextarea>

          {/* Botón Guardar */}
          <IonButton expand="block" className="form-field" onClick={saveRepo}>
            Crear Repositorio
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;