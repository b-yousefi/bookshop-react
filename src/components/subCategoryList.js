import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core'
import { NavLink } from 'react-router-dom';

export default function SubCategoryList(props) {
    if (!props.category.subCategories) {
        return <div />
    }
    return (
        props.category.subCategories.map((subCategory, i) => {
            return (
                <ListItem key={i} button component={NavLink}
                    to={{
                        pathname: `/categories/${subCategory.id}`,
                        state: {
                            categoryId: subCategory.id
                        }
                    }}
                    onClick={props.onClick}
                >
                    <ListItemText primary={subCategory.name} />
                </ListItem>
            )

        })
    );
}