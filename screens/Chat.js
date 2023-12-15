import React from 'react'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { auth, firestore } from '../config/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

const chat = () => {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
      const user = auth.currentUser;
      if (!user) {
        console.log('No user is signed in.');
        return;
      }
  
      const q = query(collection(firestore, 'faq'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const faqsArray = [];
        querySnapshot.forEach((doc) => {
          faqsArray.push({ id: doc.id, ...doc.data() });
        });
        setFaqs(faqsArray);    
      });
  
      return () => unsubscribe();
    }, []);
  
    const handleQuestionClick = (faq) => {
      // Vous pouvez ici définir la logique pour gérer le clic sur une question
      console.log('Question clicked:', faq.question);
    };
  
    return (
      <ScrollView style={styles.container}>
        {faqs.map((faq, index) => (
          <TouchableOpacity key={faq.id} onPress={() => handleQuestionClick(faq)}>
            <Card containerStyle={styles.card}>
              <Card.Title>{faq.question}</Card.Title>
              {/* Afficher d'autres détails de la FAQ ici si nécessaire */}
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e6eef8",
      },
      card: {
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
      },
})

export default chat
