/**
 * RoommateProfile interface defines the structure of a roommate profile.
 */
export interface RoommateProfile {
    id: string;                 // Unique identifier for the profile
    name: string;               // Name of the roommate
    age: number;                // Age of the roommate
    gender: string;             // Gender of the roommate
    bio: string;                // A short bio describing the roommate
    location: string;           // Location preference (e.g., Downtown, Suburb)
    image_id?: string;          // Optional image ID to fetch from storage
    interests: string[];        // List of interests or hobbies
    rent: number;               // Rent amount roommate is comfortable with
    availability: string;       // When the roommate is available (e.g., "Move-in: Oct 15, 2024")
    contactEmail: string;       // Email address to contact the roommate
    phone?: string;             // Optional phone number for contact
    preferredRoommateGender: string; // Preferred gender of roommate (e.g.,"Male", "Female")
    isPetFriendly: boolean;     // Whether the roommate is comfortable with pets
    isSmoker: boolean;          // Whether the roommate is a smoker
    studyArea: string;          // Major or field of study (e.g., "Computer Science", "Economics")
    bedtime: string;            // Usual bedtime (e.g., "11:00 PM")
    socialLinks?: {             // Optional social media links
      instagram?: string;
      facebook?: string;
      linkedin?: string;
    };
    foodPreferences: string;    // Dietary preferences (e.g., "Vegan", "Halal", "Vegetarian")
    cleaningHabits: string;     // Cleaning frequency (e.g., "Daily", "Weekly")
    sharedActivities: string[]; // Activities they'd like to share with a roommate (e.g., "Study Sessions", "Gym", "Gaming")
    quietHours: string;         // Preferred quiet hours (e.g., "10:00 PM - 7:00 AM")
  }
  