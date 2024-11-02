<?php
session_start();

$search = $_GET['search'] ?? '';

if (!empty($search)) {
    if (!isset($_SESSION['searches'])) {
        $_SESSION['searches'] = [];
    }
    if (!in_array($search, $_SESSION['searches'])) {
        $_SESSION['searches'][] = $search;
    }
}