import { asyncHandler } from "../utils/asyncHandler.js";
import { categoriesAndsubcategory } from "../utils/categoryAndsubcategory.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";
import Blog from "../models/Blog.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const Blogpost = asyncHandler(async (req, res) => {
    const { Title, Description, categories, subcategory } = req.body;

    console.log(req.body);

    // Validation
    if (!Title || !Description || !categories || !subcategory) {
        throw new ApiError(400, "All fields are required");
    }

    // Category and Subcategory Validation
    if (!Object.keys(categoriesAndsubcategory).includes(categories)) {
        console.log({ CAT: categories });
        throw new ApiError(400, "Invalid category");
    }

    // Ensure subcategory is an array if it's a single value
    let subcategories = Array.isArray(subcategory) ? subcategory : [subcategory];

    let validSubcategories = categoriesAndsubcategory[categories];

    // Check if all provided subcategories are valid
    let isValid = subcategories.every((item) => validSubcategories.includes(item));

    if (!isValid) {
        throw new ApiError(400, "Invalid subcategory");
    }

    // UserID fetch
    const userid = req.user?.id;
    if (!userid) {
        throw new ApiError(401, "Unauthorized user");
    }

    // Blog Image Upload
    const blogImagePath = req.files?.BlogImage[0]?.path;
    console.log({ B: blogImagePath });
    if (!blogImagePath) {
        throw new ApiError(400, "Blog image is required");
    }
   

    let blogImageFile;
    try {
        blogImageFile = await uploadOnCloudinary(blogImagePath);
        console.log({"Uploaded successfully blogImage on Cloudinary ..." : blogImageFile.secure_url});
    } catch (error) {
        throw new ApiError(500, "Failed to upload blog image on Cloudinary", error.message);
    }

    // Thumbnail Image Upload
    const thumbnailPath = req.files?.thumbnail[0]?.path;
    console.log({ T: thumbnailPath });

    if (!thumbnailPath) {
        throw new ApiError(400, "Thumbnail image is required");
    }

    let thumbnailFile;
    try {
        thumbnailFile = await uploadOnCloudinary(thumbnailPath);
        console.log({"Uploaded successfully thumbnail on Cloudinary ..." : thumbnailFile.secure_url});
    } catch (error) {
        throw new ApiError(500, "Failed to upload thumbnail on Cloudinary", error.message);
    }

    // Save to Database
    const newBlog = await Blog.create({
        Title,
        Description,
        categories,
        subcategory: subcategories, // Save as an array
        BlogImage: blogImageFile.secure_url,
        thumbnail: thumbnailFile.secure_url,
        userId: userid // Ensure the user ID is saved
    });
    console.log(newBlog);

    res.status(201).json(new ApiResponse(201, newBlog, "Blog Created successfully"));
});

export default Blogpost;
