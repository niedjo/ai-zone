import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';
import * as DocumentPicker from 'expo-document-picker';
import { Alert } from 'react-native';
import { config } from './config';

const {
    endpoint,
    platform, 
    projetId,
    databaseId,
    userCollectionId,
    videosCollectionId,
    storageId,
    likedId,
} = config

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projetId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client)

// Register User
export const CreatUser = async (email : string, password : string, username : string) => {
    // account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    //     .then(function (response : Response) {
    //         console.log(response);
    //     }, function (error : Error) {
    //         console.log(error);
    //     });

    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if(!newAccount) throw new Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)
        
        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId : newAccount.$id,
                email,
                username,
                avatar : avatarUrl
            }
        )
       
        return newUser;

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

export const signIn = async (email : string, password : string) => {
    try {
        // await account.deleteSession('current');
        // console.log('Existing session destroyed');
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error

        return currentUser.documents[0]

    } catch (error) {
        console.log(error);
    }
}

export const getAllPost = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videosCollectionId,
            [Query.orderDesc('$createdAt')]
        )

        // console.log("POST", posts.documents[0]);

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getLatestPost = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videosCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const searchPosts = async ( query : string ) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videosCollectionId,
            [Query.search('title', query || '')]
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getUserPosts = async ( userID : string ) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videosCollectionId,
            [Query.equal('creator', userID), Query.orderDesc('$createdAt')]
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        throw new Error(error);
        
    }
}

// juste pour upload des videos

export const getFilePreview = async (fileId : string, type : 'image' | 'video' ) => {
    let fileUrl

    try {
       if (type === 'video') {
        fileUrl = storage.getFileView(storageId, fileId)
       } else if (type === 'image') {
        fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, undefined, 100)
       }

       if (!fileUrl) throw new Error;

       return fileUrl
       
    } catch (error) {
        throw new Error;
        
    }
}


export const uploadFile = async (file : DocumentPicker.DocumentPickerAsset, type : string) => {
    if(!file) return

    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri,
    }

    // console.log("FILE", file);

    try {
        const uploadedFile = await storage.createFile(
            storageId,
            ID.unique(),
            asset
        );

        // console.log('Uploaded', uploadedFile);

        const fileUrl = await getFilePreview(uploadedFile.$id, type)
        return fileUrl
    } catch (error) {
        throw new Error;
        
    }
}

export const CreateVideo = async (form : VideoFormType) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail as DocumentPicker.DocumentPickerAsset, 'image'),
            uploadFile(form.video as DocumentPicker.DocumentPickerAsset, 'video')
        ])

        const newPost = await databases.createDocument(
            databaseId, videosCollectionId, ID.unique(), {
                title : form.title,
                thumbnail : thumbnailUrl,
                video : videoUrl,
                prompt : form.prompt,
                creator : form.userID
            }
        )
        return newPost
    } catch (error) {
        throw new Error
    }
}

export const BookmarkePost = async ( userId : string, videoId : string) => {
    try {
        const result = await databases.listDocuments(
            databaseId,
            likedId,
            [Query.equal('id_video', videoId), Query.equal('id_user', userId), Query.limit(1)]
        )

        if (result.documents[0]) return Alert.alert("No,", "this Post has yet been saved by you")

        const newBookmark = await databases.createDocument(
            databaseId,
            likedId,
            ID.unique(),
            {
                id_user : userId,
                id_video : videoId,
            }
        )

        Alert.alert('Succes', 'Post saved successfully')

        return newBookmark;
    } catch (error) {
        throw new Error(error);
        
    }
}

export const getAllBookmarkedPost = async ( userId : string ) => {
    try {
        const result1 = await databases.listDocuments(
            databaseId,
            likedId,
            [Query.equal('id_user', userId), Query.orderAsc('id_user')]
        )
    
        const firstResult = result1.documents;

        const result2 = await databases.listDocuments(
            databaseId,
            videosCollectionId
        )
    
        const secondResult = result2.documents;
    
        const finalResult = []
    
        for (let i = 0; i < firstResult.length; i++) {
            const element = firstResult[i];

            for (let j = 0; j < secondResult.length; j++) {
                const element2 = secondResult[j];
                if (element2.$id === element.id_video) finalResult.push(element2)
            }
        }
        
        return finalResult;
        
    } catch (error) {
        throw new Error(error);
        
    } 

}

