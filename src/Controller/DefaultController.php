<?php
/**
 * Created by PhpStorm.
 * User: Rafa
 * Date: 10/12/2018
 * Time: 17:46
 *
 * @package EasyRdf
 */

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api", name="api")
 */
class DefaultController extends AbstractController
{
    /**
     * @Route("/index", name="api_v1")
     */
    public function index() {
//        $foaf = new EasyRdf_Graph('http://njh.me/foaf.rdf');
//        $me = $foaf->primaryTopic();

        return $this->render('base.html.twig');
    }
}