"use client";

import React, { useCallback } from "react";

import { User as FirebaseUser } from "firebase/auth";
import {
    Authenticator,
    buildCollection,
    buildProperty,
    EntityReference,
    FirebaseCMSApp
} from "firecms";

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";

// TODO: Replace with your config
import { firebaseConfig } from "../firebase";

type PrayerRooms = {
    building:string;
    room_number:number;
    description: string;
}
type InstagramPost = {
    link:string;
}
type JummahInfo = {
    room: string;
    time: string;
}

type WeeklyEvents = {
    day:string;
    desc:string;
    img: string;
    name:string;
    room:string;
    time:string;
}
type Mosques = {
    name:string;
    link:string;
}

type Other = {
    name:string;
    link:string;
}
type Resources = {
    name:string;
    link:string;
}
type Socials = {
    icon:string;
    link:string;
    name:string;
}
type Forms = {
    link:string;
    name: string;
}


const FormsCollection = buildCollection<Forms>({
    path: "Forms",
    name: "Forms",
    singularName: "Form",
    permissions: ({ authController }) => ({
        edit: true,
        create: true,
        // we have created the roles object in the navigation builder
        delete: false
    }),
    properties: {
        name: {
            name: "Form Title",
            validation: { required: true },
            dataType: "string",
            description: "Title of form (keep short)",
        },
        link: {
            name: "Link",
            validation: {
                required: true,
                requiredMessage: "You must set a link",
            },
            description: "Form Link",
            dataType: "string"
        },
        
    }
});

const JummahCollection = buildCollection<JummahInfo>({
    path: "Jummah",
    name: "Jummah",
    permissions: ({ authController }) => ({
        edit: true,
        create: true,
        // we have created the roles object in the navigation builder
        delete: false
    }),
    properties: {
        room: {
            name: "Room",
            validation: { required: true },
            dataType: "string",
            description: "Room Number i.e P110",
        },
        time: {
            name: "Time",
            validation: {
                required: true,
                requiredMessage: "You must set a time",
            },
            description: "Set a time for Jummah i.e 2:00 PM",
            dataType: "string"
        },
        
    }
});

const MosquesCollection = buildCollection<Mosques>({
    path: "Mosques",
    name: "Mosques",
    singularName:"Mosque",
    permissions: ({ authController }) => ({
        edit: true,
        create: true,
        // we have created the roles object in the navigation builder
        delete: false
    }),
    properties: {
        name: {
            name: "Mosque Name",
            validation: { required: true },
            dataType: "string",
            description: "Name of Mosque, i.e Waterloo Masjid",
        },
        link: {
            name: "Link",
            validation: {
                required: true,
                requiredMessage: "You must set a link",
            },
            description: "Link to mosque website / google maps location",
            dataType: "string"
        },
        
    }
});
const OtherCollection = buildCollection<Other>({
    path: "Other",
    name: "Other",
   
    permissions: ({ authController }) => ({
        edit: true,
        create: true,
        // we have created the roles object in the navigation builder
        delete: false
    }),
    properties: {
        name: {
            name: "Title",
            validation: { required: true },
            dataType: "string",
            description: "Name of item, i.e donate",
        },
        link: {
            name: "Link",
            validation: {
                required: true,
                requiredMessage: "You must set a link",
            },
            description: "Link to Item",
            dataType: "string"
        },
        
        
    }
});

const InstagramCollection = buildCollection<InstagramPost>({
    path: "Posts",
    name: "Instagram Posts",
    singularName:"Instagram Post",
    
    
    permissions: ({ authController }) => ({
        edit: true,
        create: true,
        // we have created the roles object in the navigation builder
        delete: true,
    }),
    properties: {
        link: {
            name: "Link",
            validation: {
                required: true,
                requiredMessage: "You must set a link",
            },
            description: "Link to Instagram Post",
            dataType: "string"
        },    
    }
});

const ResourcesCollection = buildCollection<Resources>({
    path: "Resources",
    name: "Resources",
    singularName:"Resource",
   
    permissions: ({ authController }) => ({
        edit: true,
        create: true,
        // we have created the roles object in the navigation builder
        delete: false
    }),
    properties: {
        name: {
            name: "Title",
            validation: { required: true },
            dataType: "string",
            description: "Title of link, i.e Tajweed App",
        },
        link: {
            name: "Link",
            validation: {
                required: true,
                requiredMessage: "You must set a link",
            },
            description: "Link to Item",
            dataType: "string"
        },
        
    }
});
const PrayerRoomsCollection = buildCollection<PrayerRooms>({
    path: "PrayerRooms",
    name: "Prayer rooms",
    singularName:"Prayer room",
    permissions: ({ authController }) => ({
        edit: true,
        create: true,
        // we have created the roles object in the navigation builder
        delete: false
    }),
    properties: {
        building: {
            name: "Building Name",
            validation: { required: true },
            dataType: "string",
            description: "Name of building where room is, i.e Bricker Academic",
        },
        description: {
            name: "Description ",
            validation: {
                required: false,
            },
            description: "Description of room amenities i.e Washrooms Nearby",
            dataType: "string"
        },
        room_number:{
            name:"Room Number",
            validation:{
                required: true,
                requiredMessage: "You must set a room number between 0 and 10000",
                min: 0,
                max: 1000
            },
            description: "Room number",
            dataType:"number"
        }
        
    }
});
const SocialsCollection = buildCollection<Socials>({
    path: "Socials",
    name: "Socials",
   
    permissions: ({ authController }) => ({
        edit: true,
        create: true,
        // we have created the roles object in the navigation builder
        delete: false
    }),
    properties: {
        name: {
            name: "Title",
            validation: { required: true },
            dataType: "string",
            description: "Title of Social, i.e Linkedin",
        },
        link: {
            name: "Link",
            validation: {
                required: true,
                requiredMessage: "You must set a link",
            },
            description: "Link to Social",
            dataType: "string"
        },
        icon: buildProperty({
            dataType: "string",
            name: "Icon",
            storage: {
                storagePath: "images",
                acceptedFiles: ["icons/*"],
                maxSize: 500 * 500,
                metadata: {
                    cacheControl: "max-age=1000000"
                },
                fileName: (context) => {
                    return context.file.name;
                }
            },
            validation:{
                required:true,
                requiredMessage:"You must set an icon"
            }
        }),
        
    }
});

const WeeklyEventsCollection = buildCollection<WeeklyEvents>({
    path: "WeeklyEvents",
    name: "Events",
    singularName:"Event",
   
    permissions: ({ authController }) => ({
        edit: true,
        create: true,
        // we have created the roles object in the navigation builder
        delete: false
    }),
    properties: {
        name: {
            name: "Title",
            validation: { 
                required: true,
                requiredMessage: "You must set the title of the event"
            },
            dataType: "string",
            description: "Title of Event, i.e Halaqas",
        },
        room:{
            name:"Room Code",
            validation: {
                required:true,
                requiredMessage:"You must set the room code"
            },
            dataType:"string",
            description:"Enter room code i.e P110"
        },
        desc: {
            name: "Description ",
            validation: {
                required: true,
                requiredMessage: "You must set a description",
            },
            description: "description of event",
            dataType: "string"
        },
        time:{
            name:"Timing of events",
            validation:{
                required:true,
                requiredMessage:"You must set a time range for the event"
            },
            description:"Time range of event i.e 5:00 PM - 5:30 PM",
            dataType:"string"
        },
        day:{
            name:"Day of event",
            validation:{
                required:true,
                requiredMessage:"You must set the day of the event"
            },
            description:"Day of the weekly event i.e Tuesdays",
            dataType:"string"
        },
        img: buildProperty({
            dataType: "string",
            name: "Image",
            storage: {
                storagePath: "images",
                acceptedFiles: ["images/*"],
                maxSize: 1920 * 1080,
                metadata: {
                    cacheControl: "max-age=1000000"
                },
                fileName: (context) => {
                    return context.file.name;
                }
            },
            validation:{
                required:false,
            },
            description:"Image for event, max size 1920 x 1080 pixels"
        }),
        
    }
});



export default function CMS() {

    const myAuthenticator: Authenticator<FirebaseUser> = useCallback(async ({
                                                                                user,
                                                                                authController
                                                                            }) => {

        if (user?.email?.includes("flanders")) {
            throw Error("Stupid Flanders!");
        }

        console.log("Allowing access to", user?.email);
        // This is an example of retrieving async data related to the user
        // and storing it in the controller's extra field.
        const sampleUserRoles = await Promise.resolve(["admin"]);
        authController.setExtra(sampleUserRoles);

        return true;
    }, []);

    return <FirebaseCMSApp
        name={"Muslim Students Association "}
        basePath={"/cms"}
        authentication={myAuthenticator}
        collections={[InstagramCollection,FormsCollection,JummahCollection,MosquesCollection,OtherCollection,PrayerRoomsCollection,ResourcesCollection,SocialsCollection,WeeklyEventsCollection]}
        firebaseConfig={firebaseConfig}
    />;
}