import { Modal } from 'flowbite-react'
import React from 'react'
import PropTypes from "prop-types";

const Terms = ({open, onClose}) => {
    
    return (
        <>
            <Modal dismissible show={open} onClose={onClose}>
                <Modal.Header>
                    Terms of Service
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis, explicabo harum numquam esse iste officia tenetur unde velit cupiditate laboriosam nobis dolorum perferendis officiis assumenda distinctio ad minima exercitationem pariatur.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus doloremque excepturi sequi? Tempore voluptate fuga architecto quia quod eius! Suscipit vel dicta soluta accusamus quidem harum delectus doloremque ipsam cum.
                           Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, enim ab. Officia saepe autem aut voluptatibus. Vero sapiente delectus et dolores ea rerum molestiae, facere veritatis similique odit iste. Obcaecati! The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis, explicabo harum numquam esse iste officia tenetur unde velit cupiditate laboriosam nobis dolorum perferendis officiis assumenda distinctio ad minima exercitationem pariatur.
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus doloremque excepturi sequi? Tempore voluptate fuga architecto quia quod eius! Suscipit vel dicta soluta accusamus quidem harum delectus doloremque ipsam cum.
                           Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, enim ab. Officia saepe autem aut voluptatibus. Vero sapiente delectus et dolores ea rerum molestiae, facere veritatis similique odit iste. Obcaecati! The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
Terms.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default Terms