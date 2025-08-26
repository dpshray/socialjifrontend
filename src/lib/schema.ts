import * as yup from "yup"

export const RegisterSchema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    nick_name: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    role_id: yup.number().required("Role is required"),
    image: yup
        .mixed()


})

export const LoginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required")
})

export const ForgotPasswordSchema = yup.object({
    email: yup
        .string()
        .required("Email is required")
        .email("Invalid email address"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    token: yup
        .string()
        .required("OTP is required")
        .length(6, "OTP must be exactly 6 digits")
})


export const gigsSchema = yup.object().shape({
    id: yup.number(),
    title: yup.string().required('Title is required'),
    category: yup.string().required('Category is required'),
    description: yup.string().required('Description is required'),
    features: yup.array().of(yup.string().required()).min(1),
    requirements: yup.array().of(yup.string().required()).min(1),
    tags: yup.array().of(yup.number()).min(1, 'At least one tag is required'),
    status: yup.string().oneOf(['0', '1']).required('Status is required'),
    image: yup.mixed().required('Image is required')
    ,
    pricing: yup.array().of(
        yup.object().shape({
            pricing_tier_id: yup.number().required(),
            price: yup.number().required(),
            delivery_time: yup.string().required(),
            tier_description: yup.string().required(),
            tier_requirement: yup.string().required(),
            currency_id: yup.number().required(),
        })
    ),
});

export const gigsUpdateSchema = yup.object().shape({
    id: yup.number().required("Gig ID is required"),
    title: yup.string().required("Title is required"),
    category: yup.string().required("Category is required"),
    description: yup.string().required("Description is required"),
    features: yup.array().of(yup.string().required("Feature is required")).min(1, "At least one feature is required"),
    requirements: yup.array().of(yup.string().required("Requirement is required")).min(1, "At least one requirement is required"),
    tags: yup.array().of(yup.number()).min(1, "At least one tag is required"),
    status: yup.string().oneOf(["0", "1"]).required("Status is required"),
    image: yup.mixed().notRequired(),
    pricing: yup.array().of(
        yup.object().shape({
            pricing_tier_id: yup.number().required("Pricing tier is required"),
            price: yup.number().required("Price is required"),
            delivery_time: yup.string().required("Delivery time is required"),
            tier_description: yup.string().required("Tier description is required"),
            tier_requirement: yup.string().required("Tier requirement is required"),
            currency_id: yup.number().required("Currency is required"),
        })
    ),
});
