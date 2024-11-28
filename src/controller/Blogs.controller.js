import { asyncHandler } from "../utils/asyncHandler.js";
import { categoriesAndsubcategory } from "../utils/categoryAndsubcategory.js";
import { uploadOnCloudinary } from "../utils/cloudniary.js";
import Blog from "../models/Blog.model.js"; // Assuming Blog model is imported
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const Blogpost = asyncHandler(async (req, res) => {
    const {
        Title,
        Description,
        categories,
        subcategory,
    } = req.body;

    console.log(req.body);

    // Validation
    if (!Title || !Description || !categories || !subcategory) {
        throw new ApiError(400, "All fields are required");
    }
 
    // Category and Subcategory Validation
    if (!Object.keys(categoriesAndsubcategory).includes(categories)) {
    console.log({  CAT :categories});

        throw new ApiError(400, "Invalid category");
    }
    // console.log({ CAT :  categoriesAndsubcategory});
    

    if (typeof subcategory === '[string]') {
        subcategory = [subcategory];
    }

    let validSubcategories = categoriesAndsubcategory[categories].filter((item) => subcategory.includes(item));

    if (validSubcategories.length !== subcategory.length) {
        throw new ApiError(400, "Invalid subcategory");
    }

    // UserID fetch
    const userid = req.user?.id;
    if (!userid) {
        throw new ApiError(401, "Unauthorized user");
    }

    // Blog Image Upload
    const blogImagePath = req.files?.[0]?.path;
    if (!blogImagePath) {
        throw new ApiError(400, "Blog image is required");
    }
    console.log(blogImagePath);
    

    let blogImageFile;
    try {
        blogImageFile = await uploadOnCloudinary(blogImagePath);
        console.log("Uploaded successfully blogImage on Cloudinary ...");
    } catch (error) {
        throw new ApiError(500, "Failed to upload blog image on Cloudinary", error.message);
    }

    // Thumbnail Image Upload
    const thumbnailPath = req.files?.[0]?.path;
    console.log(thumbnailPath);
    
    if (!thumbnailPath) {
        throw new ApiError(400, "Thumbnail image is required");
    }

    let thumbnailFile;
    try {
        thumbnailFile = await uploadOnCloudinary(thumbnailPath);
        console.log("Uploaded successfully thumbnail on Cloudinary ...");
    } catch (error) {
        throw new ApiError(500, "Failed to upload thumbnail on Cloudinary", error.message);
    }

    // Save to Database
    const newBlog = await Blog.create({
        Title,
        Description,
        categories,
        subcategory,
        blogImage: blogImageFile.secure_url,
        thumbnail: thumbnailFile.secure_url
    });

    res.status(201).json(new ApiResponse(201 ,newBlog ,"Blog Created successfully")); 
});

export default Blogpost;
