import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { Seminar } from '../../seminar';
import styles from './ImageModal.module.css';

interface ImageModalProps {
    open: boolean;
    onClose: () => void;
    imageUrl: string;
    seminar: Seminar;
    onSave: (updatedSeminar: Seminar) => void;
}

export const ImageModal = ({ open, onClose, imageUrl, seminar, onSave }: ImageModalProps) => {
    const [editedSeminar, setEditedSeminar] = useState<Seminar>(seminar);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedSeminar(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editedSeminar);
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box className={styles.modalContent}>
                <Typography variant="h6" className={styles.title}>
                    Редактирование семинара
                </Typography>
                <img src={imageUrl} alt={seminar.title} className={styles.modalImage} />
                <form onSubmit={handleSubmit} className={styles.form}>
                    <TextField
                        fullWidth
                        label="Название"
                        name="title"
                        value={editedSeminar.title}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Описание"
                        name="description"
                        value={editedSeminar.description}
                        onChange={handleChange}
                        margin="normal"
                        multiline
                        rows={4}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Дата"
                        name="date"
                        value={editedSeminar.date}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Время"
                        name="time"
                        value={editedSeminar.time}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <div className={styles.buttons}>
                        <Button variant="outlined" onClick={onClose}>
                            Отмена
                        </Button>
                        <Button variant="contained" type="submit" color="primary">
                            Сохранить
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
}; 