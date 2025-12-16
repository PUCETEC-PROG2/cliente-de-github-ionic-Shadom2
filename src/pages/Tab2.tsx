import { IonButton, IonContent, IonHeader, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { IonInput } from '@ionic/react';
import './Tab2.css';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { useHistory } from 'react-router-dom';
import { createRepository } from '../services/GithubService';

const Tab2: React.FC = () => {

  const history = useHistory();
  
  const repoFormData: RepositoryItem = {
    name: '',
    owner: null,
    description: '',
    imageUrl: null,
    language: null,
  };

  const setRepoName = (value: string) => {
    repoFormData.name = value;
  };

  const setRepoDescription = (value: string) => {
    repoFormData.description = value;
  };

  const saveRepo = () => {
    console.log('Saving repository:', repoFormData);

    if (repoFormData.name.trim() === '') {
      alert('El nombre del repositorio es obligatorio.');
      return;
    }

    createRepository(repoFormData.name, repoFormData.description)
      .then(() => {
        history.push('/tab1');
      })
      .catch((error) => {
        console.error('Error creating repository:', error);
      });
  }; // ← ESTA LLAVE FALTABA

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput
            className="form-field"
            label="Nombre del repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="android-project"
            value={repoFormData.name}
            onIonChange={(e) => setRepoName(e.detail.value ?? '')}
          ></IonInput>

          <IonTextarea
            className="form-field"
            label="Descripción del repositorio"
            labelPlacement="floating"
            fill="outline"
            placeholder="Descripción del repositorio"
            rows={6}
            autoGrow
            value={repoFormData.description}
            onIonChange={(e) => setRepoDescription(e.detail.value ?? '')}
          ></IonTextarea>

          <IonButton expand="block" className="form-field" onClick={saveRepo}>
            Guardar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
