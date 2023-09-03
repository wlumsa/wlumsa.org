"use client";
import msalogo from "public/logo.png"
const allowedEmails = ["wlumsa.admin@gmail.com","siddiquifurqan5@gmail.com","syedahmedd.02@gmail.com"]

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
    roomNumber:number;
    description: string;
}
type InstagramPost = {
    link:string;
    date: Date;
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
type LocalMosques = {
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
type Member = {
    FirstName:string;
    LastName:string;
    StudentId:number;
    Email:string;
}

const MemberCollection = buildCollection<Member>({
    path: "Members",
    name: "Members",
    singularName: "Member",
    permissions: ({ 
        user,
        authController,
         }) => {
        const isAdmin = authController.extra?.roles.includes("admin");
        return({ 
            edit: isAdmin,
            create: isAdmin,
            // we have created the roles object in the navigation builder
            delete: isAdmin
        })
        
    },
    properties: {
        FirstName: {
            name: "First Name",
            validation: { required: true },
            dataType: "string",
            description: "First name of person",
        },
        LastName: {
            name: "Last Name",
            validation: {
                required: true,
            },
            description: "Last name of person",
            dataType: "string"
        },
        StudentId:{
            name:"Student Id",
            validation:{required:true},
            description:"Student id of person",
            dataType:"number"
        },
        Email:{
            name:"Email",
            validation:{required:true},
            description:"Email address of person",
            dataType:"string"
        }
    }
});

const FormsCollection = buildCollection<Forms>({
    path: "Forms",
    name: "Forms",
    singularName: "Form",
    permissions: ({ 
        user,
        authController,
         }) => {
        const isAdmin = authController.extra?.roles.includes("admin");
        return({ 
            edit: isAdmin,
            create: isAdmin,
            // we have created the roles object in the navigation builder
            delete: isAdmin
        })
        
    },
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
    permissions: ({ authController }) => {
        const isAdmin = authController.extra?.roles.includes("admin");
        return({ 
            edit: isAdmin,
            create: isAdmin,
            // we have created the roles object in the navigation builder
            delete: isAdmin
        })
        
    },
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

const LocalMosquesCollection = buildCollection<LocalMosques>({
    path: "LocalMosques",
    name: "LocalMosques",
    singularName:"Mosque",
    permissions: ({ authController }) => {
        const isAdmin = authController.extra?.roles.includes("admin");
        return({ 
            edit: isAdmin,
            create: isAdmin,
            // we have created the roles object in the navigation builder
            delete: isAdmin
        })
        
    },
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
   
    permissions: ({ authController }) => {
        const isAdmin = authController.extra?.roles.includes("admin");
        return({ 
            edit: isAdmin,
            create: isAdmin,
            // we have created the roles object in the navigation builder
            delete: isAdmin
        })
        
    },
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
    initialSort:["date","desc"],
    
    
    permissions: ({ authController }) => {
        const isAdmin = authController.extra?.roles.includes("admin");
        return({ 
            edit: isAdmin,
            create: isAdmin,
            // we have created the roles object in the navigation builder
            delete: isAdmin
        })
        
    },
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
        date: buildProperty({
            dataType: "date",
            name: "Created at",
            autoValue: "on_create"
            }),
    }
});

const ResourcesCollection = buildCollection<Resources>({
    path: "Resources",
    name: "Resources",
    singularName:"Resource",
   
    permissions: ({ authController }) => {
        const isAdmin = authController.extra?.roles.includes("admin");
        return({ 
            edit: isAdmin,
            create: isAdmin,
            // we have created the roles object in the navigation builder
            delete: isAdmin
        })
        
    },
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
    permissions: ({ authController }) => {
        const isAdmin = authController.extra?.roles.includes("admin");
        return({ 
            edit: isAdmin,
            create: isAdmin,
            // we have created the roles object in the navigation builder
            delete: isAdmin
        })
        
    },
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
        roomNumber:{
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
   
    permissions: ({ authController }) => {
        const isAdmin = authController.extra?.roles.includes("admin");
        return({ 
            edit: isAdmin,
            create: isAdmin,
            // we have created the roles object in the navigation builder
            delete: isAdmin
        })
        
    },
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
   
    permissions: ({ authController }) => {
        const isAdmin = authController.extra?.roles.includes("admin");
        return({ 
            edit: isAdmin,
            create: isAdmin,
            // we have created the roles object in the navigation builder
            delete: isAdmin
        })
        
    },
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

        if (user?.email && allowedEmails.includes(user?.email.toLowerCase())) {
            const sampleUserData = await Promise.resolve({
                roles: ["admin"]
            });
            authController.setExtra(sampleUserData);
            return true;
        }else{
            throw Error ("Access Denied, Contact Admin")
        }
    }, []);

    return <FirebaseCMSApp
        name={"Muslim Students Association "}
        basePath={"/cms"}
        authentication={myAuthenticator}
        collections={[InstagramCollection,MemberCollection,FormsCollection,JummahCollection,LocalMosquesCollection,OtherCollection,PrayerRoomsCollection,ResourcesCollection,SocialsCollection,WeeklyEventsCollection]}
        firebaseConfig={firebaseConfig}
        logo={msalogo.src}
    />;
}