import { useState, useEffect } from "react";

export const useForm = (initialForm = {}) => {
    const [formState, setFormState] = useState(initialForm);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        validateForm();
    }, [formState]);

    const validateForm = () => {
        const requiredFields = ['id', 'name', 'description', 'date_release'];
        const isValid = requiredFields.every(field => formState[field]?.trim() !== '');
        setIsValid(isValid);
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    const onInputChange = ({ target }) => {
        const { name, value } = target;

        if (name === 'date_release') {
            const releaseDate = new Date(value);
            const revisionDate = new Date(releaseDate);
            revisionDate.setFullYear(revisionDate.getFullYear() + 1);
            
            setFormState({
                ...formState,
                [name]: value,
                date_revision: revisionDate.toISOString().split('T')[0]
            });
        } else {
            setFormState({
                ...formState,
                [name]: value
            });
        }
    };

    return {
        ...formState,
        formState,
        isValid,
        onInputChange,
        onResetForm,
        setFormState
    };
};