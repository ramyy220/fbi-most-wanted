import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { auth, firestore } from '../config/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { AuthErrorCodes } from 'firebase/auth';

const Likes = () => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.log('No user is signed in.');
      return;
    }

    const q = query(
      collection(firestore, 'swipes'), 
      where('swipedRight', '==', true),
      where('users', '==', user.uid)
    );
    console.log('Current user UID:', user.uid);
    console.log('Query:', q);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const likesArray = [];
      querySnapshot.forEach((doc) => {
        likesArray.push(doc.data());
      });
      const uniqueLikes = likesArray.reduce((acc, current) => {
        const x = acc.find(item => item.title === current.title);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      setLikes(uniqueLikes);    
    });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {likes.map((like, index) => (
        <Card key={index} containerStyle={styles.card}>
          {like.title && typeof like.title === 'string' ? (
            <Card.Title>{like.title}</Card.Title>
          ) : (
            <Text>Invalid title</Text>
          )}
          <View style={styles.imageContainer}>
            {like.image && typeof like.image === 'string' ? (
              <Card.Image source={{uri: like.image}} style={styles.image} />
            ) : (
              <Text>Invalid image</Text>
            )}
          </View>
        </Card>
      ))}
    </ScrollView>
  );
};

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
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 360,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#002176',
  },
})
export default Likes;