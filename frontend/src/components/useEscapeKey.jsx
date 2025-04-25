import { useEffect } from 'react';

function useEscapeKey(callback) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                callback();
            }
        };

        document.addEventListener('keydown', handleEsc, true);

        return () => {
            document.removeEventListener('keydown', handleEsc, true);
        };
    }, [callback]);
}

export default useEscapeKey;
