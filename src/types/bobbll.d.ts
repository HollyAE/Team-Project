type SalaryIntervals = "Hour" | "Week" | "Month" | "Annum";

type SalaryTypes = "Salary Range" | "Fixed";

type IndustryTypes =
  | "Beauty Sport"
  | "Care Taker"
  | "Cleaning"
  | "Construction"
  | "Communication"
  | "Education"
  | "Farm"
  | "Finance"
  | "Fin-tech"
  | "Government"
  | "Health"
  | "Hospitality"
  | "Human Resources"
  | "Information Technology"
  | "Legal"
  | "Marketing"
  | "NGO"
  | "Office Administration"
  | "Promotion"
  | "Retail"
  | "Sales"
  | "Security"
  | "Start-Up"
  | "Transport Warehouse"
  | "Wellness"
  | "Other";

type EmploymentType = "Full Time" | "Part Time" | "Seasonal" | "Temporary";

type TemporaryType = "Project" | "" | "Zero";

type Flexible = "Schedule" | "No" | "Hours";

type JobLocationType = "Mixed" | "On Site" | "Remote";

type Sources = "bobbll" | "xpress" | "xpressEmail";

type Statuses = "Live" | "Expired" | "Deleted" | "Completed";

type Plans = "One" | "Two" | "Zero";

type JobCategory = "Tourism" | "Marketing" | "Technology" | "Remote" | "Sales";

interface Location {
  addressLine: string;
  Latitude: number;
  Longitude: number;
  postCode: string;
}

interface skillType {
  id: string;
  name: string;
}

interface skill {
  id: string;
  name: string;
  type: skillType;
}

interface job {
  accepted: number;
  interests: number;
  matches: number;
  amount: string;
  amountUpper: string;
  paymentInterval: SalaryIntervals;
  salaryType: string;
  amountOfPeople: string;
  business_user_profile: string;
  business_user_uid: string;
  job_post_uid: string;
  typeOfIndustry: IndustryTypes;
  customIndustry: string;
  companyImage: string;
  companyName: string;
  companyURL: string;
  shouldShowCompanyURL: boolean;
  typeOfEmployment: EmploymentType;
  temporaryType: string;
  //Missing Types as don't know how to implement timestamp from firestore
  contractLength: number;
  flexible: Flexible;
  jobLocation: Location;
  jobLocationType: JobLocationType;
  acceptAll: boolean;
  shouldShowCustomMessage: boolean;
  message: string;
  jobTitle: string;
  jobDescription: string;
  source: Sources;
  status: Statuses;
  plan: Plans;
  requiredSkills: skill[];
  yearOfStudy: string[];
  thumbnail: string;
  video: string;
  category?: JobCategory[];
}

interface university {
  web_pages?: string[];
  name: string;
  alpha_two_code?: string;
  state_province?: string;
  domains?: string[];
  country?: string;
}

interface education {
  name: string;
  startDate: Date | null | string;
  endDate: Date | null | string;
  type: string;
  description : string;
  degreeClassification : string;
}

interface experience {
  name: string;
  startDate: Date | null;
  endDate: Date | null;
  description: string | null;
  jobTitle : string
}

interface reference {
  refereeName: string;
  refereeContact: string;
  reference: string;
}

interface user {
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;

  CV?: CV;
  applied?: string[];
  rejected?: string[];
  education?: education[];
  profilePictureURL?: string;
  avatarURL?: string;
  phoneNumber?: string;
  aboutMe?: string;
  gender?: string;
  dateOfBirth?: string;
  yearOfStudy?: string;
  countryCode?: string;
  skills?: string[];
  industries?: string[];
  qualities? : string[];
}

interface CV {
  fname : string,
  sname : string;
  number : string;
  email : string;
  personalStatement : string;
  qualities : string[];
  skills : string[];
  education : education[];
  experience : experience[];
  refs : reference[];
}
