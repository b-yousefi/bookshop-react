import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core'


export default function SubCategoryList(props) {
    if (!props.category.subCategories) {
        return <div />
    }
    return (
        props.category.subCategories.map((subCategory, i) => {
            return (
                <ListItem key={i} button>
                    <ListItemText primary={subCategory.name} />
                </ListItem>
            )

        })
    );
}