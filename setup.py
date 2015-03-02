import os
from setuptools import setup, find_packages


def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()

setup(
    name="django-reform",
    version="0.0.1",
    author="Jonas Hagstedt",
    author_email="hagstedt@gmail.com",
    description=("Django reform"),
    license="BSD",
    keywords="Django ReactJS",
    url="https://github.com/jonashagstedt/django-reform",
    packages=find_packages(),
    long_description=read('README.md'),
    include_package_data=True,
    install_requires=[
        "Django >= 1.6, < 1.8"
    ],
    classifiers=[
        "Development Status :: 4 - Beta",
        "License :: OSI Approved :: BSD License",
        "Programming Language :: Python :: 2.7",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.3",
        "Programming Language :: Python :: 3.4",
    ],
)
