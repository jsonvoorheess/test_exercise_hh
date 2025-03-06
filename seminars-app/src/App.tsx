import styles from "./App.module.css"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { api } from "./api"
import { Seminar } from "./seminar"
import image1 from './assets/1.jpg'
import image2 from './assets/2.jpg'
import image3 from './assets/3.jpg'
import image4 from './assets/4.jpg'
import image5 from './assets/5.jpg'
import image6 from './assets/6.jpg'
import image7 from './assets/7.jpg'
import image8 from './assets/8.jpg'
import image9 from './assets/9.jpg'
import image10 from './assets/10.jpg'
import { Article } from "./components/Article/Article"

const images = {
  1: image1,
  2: image2,
  3: image3,
  4: image4,
  5: image5,
  6: image6,
  7: image7,
  8: image8,
  9: image9,
  10: image10,
};

function App() {
  const [seminars, setSeminars] = useState<Seminar[]>([]);

  const fetchSeminars = async () => {
    try {
      const seminarsData = await api.getSeminars();
      setSeminars(seminarsData);
    } catch (error) {
      console.error('Ошибка при загрузке семинаров:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteSeminar(id);
      setSeminars(prevSeminars => {
        const newSeminars = prevSeminars.filter(seminar => seminar.id !== id);
        return newSeminars;
      });
    } catch (error) {
      console.error('Ошибка при удалении семинара:', error);
      alert('Произошла ошибка при удалении семинара. Пожалуйста, попробуйте снова.');
    }
  };

  const handleEdit = async (updatedSeminar: Seminar) => {
    try {
      await api.updateSeminar(updatedSeminar.id, updatedSeminar);
      setSeminars(prevSeminars => {
        const newSeminars = prevSeminars.map(seminar => 
          seminar.id === updatedSeminar.id ? updatedSeminar : seminar
        );
        return newSeminars;
      });
    } catch (error) {
      console.error('Ошибка при обновлении семинара:', error);
      alert('Произошла ошибка при обновлении семинара. Пожалуйста, попробуйте снова.');
    }
  };

  useEffect(() => {
    fetchSeminars();
  }, []);

  return (
    <>
    <header className={clsx(styles.container, styles.header)}>
      <h1 className={styles.h1}>
        Управление семинарами
      </h1>
      <hr />
    </header>
      <main className={styles.container}>
        <div className={styles.seminars}>
          {seminars.map((seminar) => (
            <Article 
              key={seminar.id} 
              seminar={seminar} 
              photo={images[seminar.id as keyof typeof images]}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default App
