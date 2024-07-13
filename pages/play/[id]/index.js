import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Landing.module.css'; // Import CSS module for styling

function Landing() {
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id !== undefined) {
            handleLinkClick(id)
        }
    }, [id])
    // State to manage loading visibility
    const [isLoading, setIsLoading] = useState(false);

    // Function to handle link click and redirect after delay
    const handleLinkClick = async (ids) => {
        setIsLoading(true); // Show loading overlay
        router.push(generateLink(ids));
        setIsLoading(false);
    };

    // Example base URL for generating links
    const baseURL = 'https://example.com/link/';


    const generateTemporaryLink = async (employeeId) => {
        try {
            const response = await fetch("/api/generate-link", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ baseUrl: "currentURL", employeeId }),
            });
            const data = await response.json();
            return data
        } catch (error) {
            console.error("Failed to generate link: ", error);
        }
    };

    const generateTemporaryLinkFind = async (id) => {
        try {
            const response = await fetch("/api/generate-link", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            const data = await response.json();
            return data
        } catch (error) {
            console.error("Failed to generate link: ", error);
        }
    };
    // Function to generate the complete link
    const generateLink = async (id) => {
        let idsd = await generateTemporaryLink(id)
        console.log("idid", idsd?.newTemporaryLink['_id']);
        router.push(`${baseURL}${idsd?.newTemporaryLink['_id']}`);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.te}>Generate Link</h1>
            <div className={styles.loader}></div>
        </div>
    );
}

export default Landing;
