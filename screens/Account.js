import { useEffect, useState } from 'react';
import { auth, firestore } from '../config/firebase';
import { collection, query, where, getDoc, doc, updateDoc } from 'firebase/firestore';
import { Image, StyleSheet, Text, View, Button, Alert } from 'react-native';
import Logo from '../assets/Seal_of_the_FBI.svg.png';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import CustomButton from '../components/CustomButton';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomInput from '../components/CustomInput';
import { signOut } from 'firebase/auth';

const Account = ({ navigation }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    profileImageUrl: Logo
  });

  useEffect(() => {
    async function getUser() {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userCollection = collection(firestore, 'users');
          const docref = doc(userCollection, currentUser.uid);
          const docsnapshot = await getDoc(docref);

          if(docsnapshot.exists()) {
            const userDoc = docsnapshot;
            const userData = userDoc.data();
            console.log('User data:', userData); // Ajoutez cette ligne
            setUser({
              ...user,
              newName: userData.username,
              newEmail: userData.email,
              profileImageUrl: { uri: userData.profileImageUrl }
            });
          }

        }
      }

       getUser(); // Ajoutez cette ligne

    }, []);


    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    
      if (!result.canceled) {
        const imageUri = result.assets[0].uri;;
        const response = await fetch(imageUri);
        const blob = await response.blob();
    
        const storage = getStorage();
        const storageRef = ref(storage, 'user_profile_images/' + auth.currentUser.uid);
    
        await uploadBytes(storageRef, blob);
    
        const downloadURL = await getDownloadURL(storageRef);
    
        const userCollection = collection(firestore, 'users');
        const docref = doc(userCollection, auth.currentUser.uid);
        await updateDoc(docref, {
          profileImageUrl: downloadURL
        });
    
        setUser({ ...user, profileImageUrl: { uri: downloadURL } });
      }
    };
    

  const handleLogout = () => {
    
    signOut(auth).then(() => {
      Alert.alert("Logout", "You have been disconnected.");
      navigation.navigate('Login');
  }).catch((error) => {
      console.error("Logout error:", error);
  });
  };

  
  const handleUpdateUser = async () => {
    const userCollection = collection(firestore, 'users');
    const docref = doc(userCollection, auth.currentUser.uid);
    try {
      await updateDoc(docref, {
        username: user.newName,
        email: user.newEmail
      });
      setUser({ ...user, name: user.newName, email: user.newEmail });
      Alert.alert("Success", "your profile has been updated");
    } catch (error) {
      Alert.alert("Error", "An error occurred during the update.");
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
        <Image source={user.profileImageUrl} style={styles.profileImage} />
        <MaterialCommunityIcons name="image-edit" size={35} color="#002176" style={styles.iconStyle} />
      </TouchableOpacity> 
      <CustomInput
        icone={<MaterialCommunityIcons name="account-edit" size={20} color="#002176" />}
        value={user.newName}
        setValue={(text) => setUser({ ...user, newName: text })}
        placeholder="New username"
      />
      <CustomInput
        icone={<MaterialCommunityIcons name="email-edit" size={20} color="#002176" />}
        value={user.newEmail}
        setValue={(text) => setUser({ ...user, newEmail: text })}
        placeholder="New email"
      />
      <TouchableOpacity onPress={handleUpdateUser} style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Upload your profile</Text>
      </TouchableOpacity>
      <View style={styles.logout}>
      <CustomButton text="Logout" onPress={handleLogout} icone={<MaterialCommunityIcons name='logout-variant' size={20} color='white' />} /> 
      </View>
    </View>


  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6eef8',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 15,
    marginBottom: 30,
    borderWidth: 4,
    borderColor: '#002176',
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    position: 'absolute',
    right: 0,
    bottom: 25,
    borderRadius: 15,
    padding: 5,
  },
  updateButton: {
    backgroundColor: '#002176',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDetailsCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    alignItems: 'center',
  },
  nameText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#002176',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 18,
    color: '#333333',
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: '#0044cc',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  logout: {
    marginTop: 'auto',
    marginBottom: 40,

  },
});


export default Account;
