import React, { useState } from 'react';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        profilePicture: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send registration data to backend or blockchain
        console.log('Registration data:', formData);
        // Reset form fields
        setFormData({
            name: '',
            bio: '',
            profilePicture: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <input type="text" name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
            <input
                type="text"
                name="profilePicture"
                value={formData.profilePicture}
                onChange={handleChange}
                placeholder="Profile Picture URL"
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;
