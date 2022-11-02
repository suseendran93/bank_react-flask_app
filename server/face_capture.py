import cv2
import os
import numpy as np
import pickle
from PIL import Image



def getFace(person_name):
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))

    image_dir = os.path.join(BASE_DIR, "images_login")
    # person_name = input("Enter your name: ")
    os.mkdir(image_dir + "/" + person_name)
    real_path = os.path.join(image_dir, person_name)
    facedetect = cv2.CascadeClassifier('models/haarcascade_frontalface_alt2.xml')
    video = cv2.VideoCapture(0)
    count = 0
    while True:
        ret, frame = video.read()
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = facedetect.detectMultiScale(gray, 1.3, 5)

        for x, y, w, h in faces:
            count = count+1
            cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 3)

            name = person_name+str(count)+".png"
            # for gray
            roi_gray = gray[y:y+h, x:x+w]
            # for color
            roi_color = frame[y:y+h, x:x+w]
            cv2.imwrite(real_path+"/"+name, roi_color)

        # Display the resulting frame
        cv2.imshow("frame", frame)
        k = cv2.waitKey(20)
        if count > 200:
            break
    video.release()
    cv2.destroyAllWindows()

def trainFace():
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    image_dir = os.path.join(BASE_DIR, "images_login")

    current_id = 0
    label_ids = {}
    y_labels = []
    x_train = []
    facedetect = cv2.CascadeClassifier('models/haarcascade_frontalface_alt2.xml')
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read("trainer.yml")

    for root, dirs, files in os.walk(image_dir):
        for file in files:
            if file.endswith("png") or file.endswith("jpg"):
                path = os.path.join(root, file)
                label = os.path.basename(os.path.dirname(path)).replace(" ", "-").lower()
                print(label, path)

                # creating label ids
                if not label in label_ids:
                    label_ids[label] = current_id
                    current_id += 1
                id_ = label_ids[label]

                pil_image = Image.open(path).convert("L")  # grayscale
                size = (550, 550)
                final_image = pil_image.resize(size, Image.Resampling.LANCZOS)
                image_array = np.array(final_image, "uint8")
                print(image_array)
                # detector
                faces = facedetect.detectMultiScale(image_array, 1.3, 5)

                for x, y, w, h in faces:
                    roi = image_array[y:y + h, x:x + w]
                    x_train.append(roi)
                    y_labels.append(id_)

    with open("labels.pickle", "wb") as f:
        pickle.dump(label_ids, f)

    recognizer.train(x_train, np.array(y_labels))
    recognizer.save("trainer.yml")

