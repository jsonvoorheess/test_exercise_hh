import { Seminar } from "../../seminar"
import styles from './Article.module.css'
import { Calendar, Clock, Edit2, Trash2 } from 'react-feather'
import { useState } from 'react'
import { ImageModal } from '../ImageModal/ImageModal'

interface ArticleProps {
    seminar: Seminar
    photo: string
    onDelete: (id: number) => void
    onEdit: (updatedSeminar: Seminar) => void
}

export const Article = ({ seminar, photo, onDelete, onEdit }: ArticleProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        onDelete(seminar.id);
    };

    const handleSaveEdit = (updatedSeminar: Seminar) => {
        onEdit(updatedSeminar);
    };

    return (
        <article className={styles.article}>
            <div className={styles.photo} onClick={handleImageClick}>
                <img className={styles.img} src={photo} alt={seminar.title} />
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{seminar.title}</h2>
                    <div className={styles.buttons}>
                        <button className={styles.editButton} onClick={handleImageClick}>
                            <Edit2 size={20} />
                        </button>
                        <button className={styles.deleteButton} onClick={handleDelete}>
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>
                <p className={styles.description}>{seminar.description}</p>
                <div className={styles.info}>
                    <p><Calendar size={16} /> {seminar.date}</p>
                    <p><Clock size={16} /> {seminar.time}</p>
                </div>
            </div>
            <ImageModal
                open={isModalOpen}
                onClose={handleCloseModal}
                imageUrl={photo}
                seminar={seminar}
                onSave={handleSaveEdit}
            />
        </article>
    )
}