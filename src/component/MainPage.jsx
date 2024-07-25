import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Sidebar from './Sidebar';
import Element from './Element';
import './MainPage.css';

Modal.setAppElement('#root');

const MainPage = () => {
    const [elements, setElements] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [config, setConfig] = useState({ x: 0, y: 0, text: '' });

    useEffect(() => {
        const savedElements = JSON.parse(localStorage.getItem('elements'));
        if (savedElements) {
            setElements(savedElements);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('elements', JSON.stringify(elements));
    }, [elements]);

    const handleDrop = (e) => {
        e.preventDefault();
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        setConfig({ ...config, x, y });
        setModalIsOpen(true);
    };

    const handleSave = () => {
        if (selectedElement !== null) {
            const updatedElements = elements.map((element, index) =>
                index === selectedElement ? { ...element, ...config } : element
            );
            setElements(updatedElements);
        } else {
            setElements([...elements, { ...config, id: Date.now() }]);
        }
        setModalIsOpen(false);
        setConfig({ x: 0, y: 0, text: '' });
        setSelectedElement(null);
    };

    const handleDragStart = (e, type) => {
        setConfig({ ...config, type, text: '' });
        setSelectedElement(null);
    };

    const handleElementClick = (index) => {
        setSelectedElement(index);
        setConfig(elements[index]);
        setModalIsOpen(true);
    };

    const handleDelete = () => {
        if (selectedElement !== null) {
            setElements(elements.filter((_, index) => index !== selectedElement));
            setSelectedElement(null);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleElementDrag = (index, e) => {
        const updatedElements = elements.map((element, i) =>
            i === index ? { ...element, x: e.clientX - e.target.getBoundingClientRect().left, y: e.clientY - e.target.getBoundingClientRect().top } : element
        );
        setElements(updatedElements);
    };

    return (
        <div className="container">
            <Sidebar onDragStart={handleDragStart} />
            <div className="main-page" onDrop={handleDrop} onDragOver={handleDragOver}>
                {elements.map((element, index) => (
                    <Element
                        key={element.id}
                        element={{ ...element, selected: selectedElement === index }}
                        onClick={() => handleElementClick(index)}
                        onDrag={(e) => handleElementDrag(index, e)}
                    />
                ))}

                <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                    <h2>Configure Element</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <label>
                            X: <input type="number" value={config.x} onChange={(e) => setConfig({ ...config, x: parseInt(e.target.value) })} />
                        </label>
                        <label>
                            Y: <input type="number" value={config.y} onChange={(e) => setConfig({ ...config, y: parseInt(e.target.value) })} />
                        </label>
                        <label>
                            Text: <input type="text" value={config.text} onChange={(e) => setConfig({ ...config, text: e.target.value })} />
                        </label>
                        <button onClick={handleSave}>Save Changes</button>
                        {selectedElement !== null && <button type="button" onClick={handleDelete}>Delete Element</button>}
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default MainPage;
