import React, { useState, useEffect } from 'react';
import useAuth from "../hooks/UseAuth";
import LoginNavigation from '../navigations/LoginNavigation';
import Navigation from '../navigations/Navigation';

export default function Account() {

    const { auth } = useAuth();

    if (auth == undefined) {
        return (
            <LoginNavigation/>
        )
    } else {
        return (
            <Navigation/>
        )
    } 
}