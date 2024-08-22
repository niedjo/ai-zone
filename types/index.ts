import * as ImagePicker from 'expo-image-picker';

export type fieldType = {
    username?: string;
    email : string;
    password : string;
}
  
export type FormFieldProps = {
    title : string;
    value : string;
    placeholder?: string;
    handleChangeText : (e: any) => void;
    otherStyle : string;
    keyboardType?: string
}

export type CustomButtonsProps = {
    title : string;
    handlePress : VoidFunction;
    containerStyle : string;
    textStyle?: string;
    isLoading?: boolean;
}

export type TabIconType = {
    icon : string;
    color : string;
    name : string;
    focused : boolean;
}

export type VideoFormType = {
  title : string,
  video : ImagePicker.ImagePickerAsset | null;
  thumbnail : ImagePicker.ImagePickerAsset | null;
  prompt : string,
  userID : string
}

export type InfoBoxTypes = { 
    title : string;
    subtitle? : string; 
    containerStyles?: string; 
    titleStyles : string;
}

export type EmptyStateProps = {
    title : string;
    subtitle : string;
}

export type Translations = {
    presentation: string;
    fullPresentation: string;
    Continue_with_Email: string;
    Please_fill_in_all_the_fields: string;
    Password: string;
    Username: string;
    Don_t_have_an_account: string;
    Have_an_account_already: string;
    Sign_up: string;
    Sign_in: string;
    Saved_Videos : string;
    No_Videos_Found: string;
    No_videos_found_for_this_search: string;
    Succes: string;
    Post_uploaded_successfully: string;
    Upload_Video: string;
    Create_Videos : string;
    Video_Title: string;
    Give_Your_video_a_catch_title: string;
    Thumbnail_Image: string;
    Choose_a_file: string;
    AI_Prompt: string;
    The_prompt_you_use_to_create_this_video: string;
    Submit_Publish: string;
    Welcome_Back: string;
    Search_for_a_video_topic: string;
    Latest_videos: string;
    Be_the_first_one_to_upload_a_video: string;
    Post: string;
    Followes: string;
    Search_Result: string;
    Home: string;
    Bookmark: string;
    Create: string;
    Profile: string;
    Error : string;
    Log_in_to_Aora : string;
    Missing_Query: string;
    Missing_Query_details: string;
    Language : string;
    Sign_up_to_Aora : string;
    french : string;
    english : string;
};
