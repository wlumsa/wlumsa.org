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
import { firebaseConfig } from "../../firebase";

type PrayerRooms = {
    building:string;
    room_number:number;
    description: string;
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

const productsCollection = buildCollection<Product>({
    name: "Products",
    singularName: "Product",
    path: "products",
    permissions: ({ authController }) => ({
        edit: true,
        create: true,
        // we have created the roles object in the navigation builder
        delete: false
    }),
    properties: {
        name: {
            name: "Name",
            validation: { required: true },
            dataType: "string"
        },
        price: {
            name: "Price",
            validation: {
                required: true,
                requiredMessage: "You must set a price between 0 and 1000",
                min: 0,
                max: 1000
            },
            description: "Price with range validation",
            dataType: "number"
        },
        status: {
            name: "Status",
            validation: { required: true },
            dataType: "string",
            description: "Should this product be visible in the website",
            longDescription: "Example of a long description hidden under a tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis bibendum turpis. Sed scelerisque ligula nec nisi pellentesque, eget viverra lorem facilisis. Praesent a lectus ac ipsum tincidunt posuere vitae non risus. In eu feugiat massa. Sed eu est non velit facilisis facilisis vitae eget ante. Nunc ut malesuada erat. Nullam sagittis bibendum porta. Maecenas vitae interdum sapien, ut aliquet risus. Donec aliquet, turpis finibus aliquet bibendum, tellus dui porttitor quam, quis pellentesque tellus libero non urna. Vestibulum maximus pharetra congue. Suspendisse aliquam congue quam, sed bibendum turpis. Aliquam eu enim ligula. Nam vel magna ut urna cursus sagittis. Suspendisse a nisi ac justo ornare tempor vel eu eros.",
            enumValues: {
                private: "Private",
                public: "Public"
            }
        },
        published: ({ values }) => buildProperty({
            name: "Published",
            dataType: "boolean",
            columnWidth: 100,
            disabled: (
                values.status === "public"
                    ? false
                    : {
                        clearOnDisabled: true,
                        disabledMessage: "Status must be public in order to enable this the published flag"
                    }
            )
        }),
        related_products: {
            dataType: "array",
            name: "Related products",
            description: "Reference to self",
            of: {
                dataType: "reference",
                path: "products"
            }
        },
        main_image: buildProperty({
            dataType: "string",
            name: "Image",
            storage: {
                storagePath: "images",
                acceptedFiles: ["images/*"],
                maxSize: 3840 * 2160,
                metadata: {
                    cacheControl: "max-age=1000000"
                },
                fileName: (context) => {
                    return context.file.name;
                }
            }
        }),
        tags: {
            name: "Tags",
            description: "Example of generic array",
            validation: { required: true },
            dataType: "array",
            of: {
                dataType: "string"
            }
        },
        description: {
            name: "Description",
            description: "This is the description of the product",
            longDescription: "Example of a long description hidden under a tooltip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis bibendum turpis. Sed scelerisque ligula nec nisi pellentesque, eget viverra lorem facilisis. Praesent a lectus ac ipsum tincidunt posuere vitae non risus. In eu feugiat massa. Sed eu est non velit facilisis facilisis vitae eget ante. Nunc ut malesuada erat. Nullam sagittis bibendum porta. Maecenas vitae interdum sapien, ut aliquet risus. Donec aliquet, turpis finibus aliquet bibendum, tellus dui porttitor quam, quis pellentesque tellus libero non urna. Vestibulum maximus pharetra congue. Suspendisse aliquam congue quam, sed bibendum turpis. Aliquam eu enim ligula. Nam vel magna ut urna cursus sagittis. Suspendisse a nisi ac justo ornare tempor vel eu eros.",
            dataType: "string",
            columnWidth: 300
        },
        categories: {
            name: "Categories",
            validation: { required: true },
            dataType: "array",
            of: {
                dataType: "string",
                enumValues: {
                    electronics: "Electronics",
                    books: "Books",
                    furniture: "Furniture",
                    clothing: "Clothing",
                    food: "Food"
                }
            }
        },
        publisher: {
            name: "Publisher",
            description: "This is an example of a map property",
            dataType: "map",
            properties: {
                name: {
                    name: "Name",
                    dataType: "string"
                },
                external_id: {
                    name: "External id",
                    dataType: "string"
                }
            }
        },
        expires_on: {
            name: "Expires on",
            dataType: "date"
        }
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
        collections={[FormsCollection,JummahCollection,MosquesCollection,OtherCollection,PrayerRoomsCollection,ResourcesCollection,SocialsCollection,WeeklyEventsCollection]}
        firebaseConfig={firebaseConfig}
    />;
}