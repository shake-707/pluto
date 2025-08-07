import { createFileRoute } from "@tanstack/react-router";
import Home from "../../Pages/home";



export const Route = createFileRoute("/")({
    component: Home
})