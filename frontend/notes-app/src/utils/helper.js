export const validateEmail=(email)=>{
    const regex=/^[^\s@]+@[^\s@]+\.[^s@]+$/;
    return regex.test(email);
}

export const getInitials=(name)=>{
    if(!name)
        return ""
 const words=name.split(" ");
 let initials=words[0][0]+words[1][0];
 return initials.toUpperCase();
}