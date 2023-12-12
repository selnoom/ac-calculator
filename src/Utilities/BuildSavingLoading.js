import { contexts, loadDataForPartType } from './loadParts'; // Adjust this import path

export const saveBuildToFile = (selectedPartsArray) => {
    const buildData = JSON.stringify(selectedPartsArray.map(part => part ? part.PartName : 'None'));
    const blob = new Blob([buildData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'build.txt';
    link.click();
    URL.revokeObjectURL(link.href);
};

export const loadBuildFromFile = (file, setSelectedPartsArray) => {
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const partNames = JSON.parse(e.target.result);
                const newPartsArray = partNames.map(partName => findPartByName(partName));
                const updatedPartsArray = addArmLoaderProperty(newPartsArray);
                setSelectedPartsArray(updatedPartsArray);
            } catch (error) {
                console.error('Error loading build:', error);
                alert('Invalid file format or content.');
            }
        };
        reader.readAsText(file);
    }
};

export const addArmLoaderProperty = (partsArray) => {
    return partsArray.map((part, index) => {
        if (index === 0 || index === 1) {
            // If part exists, add ArmLoader property
            return part ? { ...part, ArmLoader: true } : null;
        }
        return part;
    });
};

const loadAllParts = () => {
    const allParts = [];
    for (const partType in contexts) {
        allParts.push(...loadDataForPartType(partType));
    }
    return allParts;
};

const findPartByName = (partInput) => {
    const allParts = loadAllParts();
    let partName;

    if (typeof partInput === 'string') {
        partName = partInput.trim();
    } else if (partInput && typeof partInput === 'object' && partInput.PartName) {
        partName = partInput.PartName.trim();
    } else {
        return null;
    }

    return allParts.find(part => part.PartName.trim() === partName) || null;
};

export const generateBuildLink = (selectedPartsArray) => {
    const buildData = encodeURIComponent(JSON.stringify(selectedPartsArray.map(part => part ? part.PartName : 'None')));
    return `${window.location.origin}${window.location.pathname}?build=${buildData}`;
};

export const parseBuildFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const buildData = urlParams.get('build');
    if (buildData) {
        try {
            const partNames = JSON.parse(decodeURIComponent(buildData));
            return partNames.map(findPartByName);
        } catch (error) {
            console.error("Error parsing build data from URL:", error);
            return null;
        }
    }
    return null;
};